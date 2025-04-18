//Base map layers
var map = L.map('map').setView([21.072250485443167, 105.77387535137285], 10);   

var OSM1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    setView: [21.072250485443167, 105.77387535137285],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//Set as default base layers
OSM1.addTo(map);

var OSMHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 22,
    setView: [21.072250485443167, 105.77387535137285],
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

var OpenTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 22,
    setView: [21.072250485443167, 105.77387535137285],
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

//Data paths
vectorBordersPath = "/database_interaction/request_vectors_borders.php";
vectorDistrictsPath = "/database_interaction/request_vectors_districts.php";
vectorRoadsPath = "/database_interaction/request_vectors_roads.php";
vectorIntersectionsPath = "/database_interaction/request_vectors_intersections.php";
vectorIntersectionCountsPath = "/database_interaction/request_vectors_intersections_density.php";

//Data layers
var bordersLayer = L.geoJson();
var districtLayer = L.geoJson();
var roadsLayer = L.geoJson();
var intersectionsLayer = L.geoJson();
var rastersLayer = L.geoJson();

//Layer grouping
var bordersGroup = L.layerGroup([bordersLayer]).addTo(map);
//var districtGroup = L.layerGroup([districtLayer]).addTo(map);
var roadGroup = L.layerGroup([roadsLayer]);
var intersectionsGroup = L.layerGroup([intersectionsLayer]);
var rasterGroup = L.layerGroup([rastersLayer]);

var baseMaps = {
    "OpenStreet Map": OSM1,
    "OpenStreet Map Hot": OSMHot,
    "OpenTopo Map": OpenTopo
}

var overlayMaps = {
    "Borders": bordersGroup,
    //"Districts": districtGroup,
    "Roads": roadGroup,
    "Intersections": intersectionsGroup,
    "Density": rasterGroup
}

var layerControls = L.control.layers(baseMaps, overlayMaps).addTo(map);

//Function to fetch border data
function addBorderMap(map) {
    $.ajax({
        url: vectorBordersPath,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data,
                {
                style: function(feature) {
                    // Customize styling based on feature properties
                    return {
                        color: 'blue', // Border color
                        fillOpacity: 0, // Fill opacity
                        };
                    } 
                }, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    <strong>${feature.properties.ADM2_VI}</strong>
                                    - TP. ${feature.properties.ADM1_VI}
                                    - ${feature.properties.ADM0_VI}
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(bordersLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch district borders data
function addDistrictMap(map) {
    $.ajax({
        url: vectorDistrictsPath,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data,
                // {
                // style: function(feature) {
                //     // Customize styling based on feature properties
                //     return {
                //         color: 'blue', // Border color
                //         };
                //     } 
                // }, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    FID: ${feature.properties.fid} -
                                    ${feature.properties.TYPE_3} ${feature.properties.NAME_3} - 
                                    ${feature.properties.NAME_2} -
                                    ${feature.properties.NAME_1}
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(districtLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch road data (need tile server for rendering)
function addRoadMap(map) {
    // GeoServer WFS URL for the vector data
    const geoServerURL = 'http://localhost:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=RoadAnalysis:roads_bactuliem&outputFormat=application/json';

    // Use AJAX to fetch GeoJSON data from GeoServer
    $.ajax({
        url: geoServerURL,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Parse GeoJSON data and add it to the map layer in chunks
            let chunkSize = 1000; // Process features in smaller chunks
            let totalFeatures = data.features.length;

            for (let i = 0; i < totalFeatures; i += chunkSize) {
                let chunk = data.features.slice(i, i + chunkSize);
                L.geoJSON({type: "FeatureCollection", features: chunk},
                    // {
                    // style: function(feature) {
                    //     // Customize styling based on feature properties
                    //     return {
                    //         color: 'red', // Border color
                    //         };
                    //     } 
                    // }, 
                    {
                    onEachFeature: function (feature, layer) {
                        if (feature.properties) {
                            const popupContent = `
                                OSMID: ${feature.properties.osm_id} <br>
                                Code: ${feature.properties.code} <br>
                                Name: ${feature.properties.name} <br>
                                F-Class: ${feature.properties.fclass} <br>
                                Reference: ${feature.properties.ref} <br>
                                Maxspeed: ${feature.properties.maxspeed} <br>
                                One way: ${feature.properties.oneway} <br>
                                Bridge: ${feature.properties.bridge} <br>
                                Tunnel: ${feature.properties.tunnel} <br>
                                Layer: ${feature.properties.layer} <br>
                            `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(roadsLayer);
            }
            console.log('GeoJSON data processed and added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}


//Function to fetch intersection data (need clustering to improve performance)
function addIntersectionMap(map) {
    $.ajax({
        url: vectorIntersectionsPath,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            const intersectionCluster = L.markerClusterGroup();
            
            // Parse GeoJSON data to the map
            const geoJsonLayer = L.geoJSON(data, {
                onEachFeature: function(feature, layer) {
                    if (feature.properties) {
                        // Customize the popup content
                        const popupContent = `
                            OSMID: ${feature.properties.osm_id} <br>
                            OSMID 2: ${feature.properties.osm_id_2} <br>
                            Name: ${feature.properties.name} <br>
                            Name 2: ${feature.properties.name_2} <br>
                            One way: ${feature.properties.oneway} <br>
                            Max speed: ${feature.properties.maxspeed} <br>
                            Bridge: ${feature.properties.bridge} <br>
                            Tunnel: ${feature.properties.tunnel} <br>  
                        `;
                        layer.bindPopup(popupContent);
                    }
                }
            });

            intersectionCluster.addLayer(geoJsonLayer);
            map.addLayer(intersectionCluster);
        
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch density data
function addIntersectionCountsMap(map) {
    $.ajax({
        url: vectorIntersectionCountsPath,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                // {
                // style: function(feature) {
                //     // Customize styling based on feature properties
                //     return {
                //         color: 'green', // Border color
                //         fillOpacity: 0.5, // Fill opacity
                //         weight: 2, // Border weight
                //         };
                //     } 
                // },
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    FID: ${feature.properties.fid} -
                                    ${feature.properties.TYPE_3} ${feature.properties.NAME_3} - 
                                    ${feature.properties.NAME_2} -
                                    ${feature.properties.NAME_1} <br>
                                    Intersections count: ${feature.properties.INTERSECTIONS} <br>
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(rastersLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}


addRoadMap(roadsLayer);
addIntersectionMap(intersectionsLayer);
addIntersectionCountsMap(rastersLayer);
//addDistrictMap(districtLayer);
addBorderMap(bordersLayer);

//Show/hide road layer based on zoom level
map.on('zoomend', function() {
    //console.log('Zoom level changed:', map.getZoom());
    var zoomLevel = map.getZoom();
    if (zoomLevel > 13) {
        map.addLayer(roadsLayer);
    } else {
        map.removeLayer(roadsLayer);
    }
});
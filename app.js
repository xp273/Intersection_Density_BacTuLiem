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

//Main data paths
vectorBordersPath = "/database_interaction/request_vectors_borders.php";
vectorDistrictsPath = "/database_interaction/request_vectors_districts.php";
vectorRoadsPath = "/database_interaction/request_vectors_roads.php";
vectorIntersectionsPath = "/database_interaction/request_vectors_intersections.php";
vectorIntersectionCountsPath = "/database_interaction/request_vectors_intersections_density.php";
vectorWaterAreaPath = "/database_interaction/request_vectors_water_area.php";

//Main data layers
var bordersLayer = L.geoJson();
var districtsLayer = L.geoJson();
var roadsLayer = L.geoJson();
var intersectionsLayer = L.geoJson();
var waterAreaLayer = L.geoJson();

//Flood data layers (10m buffer)
var waterAreaBuffered10mLayer = L.geoJson();
var floodedRoads10mLayer= L.geoJson();
var floodedIntersections10mLayer = L.geoJson();

//Flood data layers (15m buffer)
var waterAreaBuffered15mLayer = L.geoJson();
var floodedRoads15mLayer= L.geoJson();
var floodedIntersections15mLayer = L.geoJson();

//Flood data layers (20m buffer)
var waterAreaBuffered20mLayer = L.geoJson();
var floodedRoads20mLayer= L.geoJson();
var floodedIntersections20mLayer = L.geoJson();

//Layer grouping
var bordersGroup = L.layerGroup([bordersLayer]).addTo(map);
var districtsGroup = L.layerGroup([districtsLayer]);
var roadsGroup = L.layerGroup([roadsLayer]);
var intersectionsGroup = L.layerGroup([intersectionsLayer]);
var waterAreaGroup = L.layerGroup([waterAreaLayer]);

var floodWaterArea10mGroup = L.layerGroup([waterAreaBuffered10mLayer]);
var floodedRoads10mGroup = L.layerGroup([floodedRoads10mLayer]);
var floodedIntersections10mGroup = L.layerGroup([floodedIntersections10mLayer]);

var floodWaterArea15mGroup = L.layerGroup([waterAreaBuffered15mLayer]);
var floodedRoads15mGroup = L.layerGroup([floodedRoads15mLayer]);
var floodedIntersections15mGroup = L.layerGroup([floodedIntersections15mLayer]);

var floodWaterArea20mGroup = L.layerGroup([waterAreaBuffered20mLayer]);
var floodedRoads20mGroup = L.layerGroup([floodedRoads20mLayer]);
var floodedIntersections20mGroup = L.layerGroup([floodedIntersections20mLayer]);

//Base map group
var baseMaps = {
    "OpenStreet Map": OSM1,
    "OpenStreet Map Hot": OSMHot,
    "OpenTopo Map": OpenTopo
}

var overlayMaps = {
    //Road data group
    "Base Road Data": {
        "Borders": bordersGroup,
        "Districts": districtsGroup,
        "Roads": roadsGroup,
        "Intersections": intersectionsGroup,
        "Water Area": waterAreaGroup,
    },
    //Flood data group (10m buffer)
    "Flood Data (10m buffer)": {
        "Flooded Water Area 10m": floodWaterArea10mGroup,
        "Flooded Roads 10m": floodedRoads10mGroup,
        "Flooded Intersections 10m": floodedIntersections10mGroup,
    },
    //Flood data group (15m buffer)
    "Flood Data (15m buffer)": {
        "Flooded Water Area 15m": floodWaterArea15mGroup,
        "Flooded Roads 15m": floodedRoads15mGroup,
        "Flooded Intersections 15m": floodedIntersections15mGroup,
    },
    //Flood data group (20m buffer)
    "Flood Data (20m buffer)": {
        "Flooded Water Area 20m": floodWaterArea20mGroup,
        "Flooded Roads 20m": floodedRoads20mGroup,
        "Flooded Intersections 20m": floodedIntersections20mGroup,
    },
}

L.control.groupedLayers(baseMaps, overlayMaps, options= {groupCheckboxes: true}).addTo(map);

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
addBorderMap(bordersLayer);

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
                }).addTo(districtsLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}
addDistrictMap(districtsLayer);

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
addRoadMap(roadsLayer);

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
addIntersectionMap(intersectionsLayer);

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
//addIntersectionCountsMap(map)

//Function to fetch water area data
function addWaterAreaMap(map) {
    $.ajax({
        url: vectorWaterAreaPath,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    ID: ${feature.properties.id} <br>
                                    Area: ${feature.properties.area} <br>
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(waterAreaLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}
addWaterAreaMap(waterAreaLayer);


//========================================================================================================================================//

//Flood data paths (10m buffer)
vectorFloodWaterAreaPath10m = "/database_interaction/request_vectors_flooded_area_10m.php";
vectorFloodedRoadsPath10m = "/database_interaction/request_vectors_flooded_roads_10m.php";
vectorFloodedIntersectionsPath10m = "/database_interaction/request_vectors_flooded_intersections_10m.php";

//Function to fetch flooded area (10m buffer) data
function addFloodedAreaMap10m(map) {
    $.ajax({
        url: vectorFloodWaterAreaPath10m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    ID: ${feature.properties.id} <br>
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(waterAreaBuffered10mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded roads (10m buffer) data
function addFloodedRoadsMap10m(map) {
    $.ajax({
        url: vectorFloodedRoadsPath10m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                OSMID: ${feature.properties.osm_id} <br>      
                                Code: ${feature.properties.code} <br>
                                F-Class: ${feature.properties.fclass} <br>
                                Name: ${feature.properties.name} <br>
                                One way: ${feature.properties.oneway} <br>
                                Max speed: ${feature.properties.maxspeed} <br>
                                Bridge: ${feature.properties.bridge} <br>
                                Tunnel: ${feature.properties.tunnel} <br>  
                            `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(floodedRoads10mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded intersections (10m buffer) data
function addFloodedIntersectionMap10m(map) {
    $.ajax({
        url: vectorFloodedIntersectionsPath10m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //const floodedIntersectionCluster = L.markerClusterGroup();

            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
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
                }).addTo(floodedIntersections10mLayer);

            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

addFloodedAreaMap10m(waterAreaBuffered10mLayer);
addFloodedRoadsMap10m(floodedRoads10mLayer);
addFloodedIntersectionMap10m(floodedIntersections10mLayer);

//========================================================================================================================================//

//Flood data paths (15m buffer)
vectorFloodWaterAreaPath15m = "/database_interaction/request_vectors_flooded_area_15m.php";
vectorFloodedRoadsPath15m = "/database_interaction/request_vectors_flooded_roads_15m.php";
vectorFloodedIntersectionsPath15m = "/database_interaction/request_vectors_flooded_intersections_15m.php";

//Function to fetch flooded area (15m buffer) data
function addFloodedAreaMap15m(map) {
    $.ajax({
        url: vectorFloodWaterAreaPath15m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    ID: ${feature.properties.id} <br>
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(waterAreaBuffered15mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded roads (10m buffer) data
function addFloodedRoadsMap15m(map) {
    $.ajax({
        url: vectorFloodedRoadsPath10m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                OSMID: ${feature.properties.osm_id} <br>      
                                Code: ${feature.properties.code} <br>
                                F-Class: ${feature.properties.fclass} <br>
                                Name: ${feature.properties.name} <br>
                                One way: ${feature.properties.oneway} <br>
                                Max speed: ${feature.properties.maxspeed} <br>
                                Bridge: ${feature.properties.bridge} <br>
                                Tunnel: ${feature.properties.tunnel} <br>  
                            `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(floodedRoads15mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded intersections (10m buffer) data
function addFloodedIntersectionMap15m(map) {
    $.ajax({
        url: vectorFloodedIntersectionsPath15m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //const floodedIntersectionCluster = L.markerClusterGroup();

            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
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
                }).addTo(floodedIntersections15mLayer);

            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

addFloodedAreaMap15m(waterAreaBuffered15mLayer);
addFloodedRoadsMap15m(floodedRoads15mLayer);
addFloodedIntersectionMap15m(floodedIntersections15mLayer);

//========================================================================================================================================//

//Flood data paths (20m buffer)
vectorFloodWaterAreaPath20m = "/database_interaction/request_vectors_flooded_area_20m.php";
vectorFloodedRoadsPath20m = "/database_interaction/request_vectors_flooded_roads_20m.php";
vectorFloodedIntersectionsPath20m = "/database_interaction/request_vectors_flooded_intersections_20m.php";

//Function to fetch flooded area (20m buffer) data
function addFloodedAreaMap20m(map) {
    $.ajax({
        url: vectorFloodWaterAreaPath20m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                    ID: ${feature.properties.id} <br>
                                `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(waterAreaBuffered20mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded roads (10m buffer) data
function addFloodedRoadsMap20m(map) {
    $.ajax({
        url: vectorFloodedRoadsPath20m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
                        if (feature.properties) {
                            // Customize the popup content
                            const popupContent = `
                                OSMID: ${feature.properties.osm_id} <br>      
                                Code: ${feature.properties.code} <br>
                                F-Class: ${feature.properties.fclass} <br>
                                Name: ${feature.properties.name} <br>
                                One way: ${feature.properties.oneway} <br>
                                Max speed: ${feature.properties.maxspeed} <br>
                                Bridge: ${feature.properties.bridge} <br>
                                Tunnel: ${feature.properties.tunnel} <br>  
                            `;
                            layer.bindPopup(popupContent);
                        }
                    }
                }).addTo(floodedRoads20mLayer);
            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

//Function to fetch flooded intersections (10m buffer) data
function addFloodedIntersectionMap20m(map) {
    $.ajax({
        url: vectorFloodedIntersectionsPath20m,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            //const floodedIntersectionCluster = L.markerClusterGroup();

            //Parse GeoJSON data to the map
            L.geoJSON(data, 
                {
                onEachFeature: function (feature, layer) {
                    // Customize the popup or marker appearance
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
                }).addTo(floodedIntersections20mLayer);

            console.log('GeoJSON data added successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch GeoJSON data:', error);
            console.error('Server response:', xhr.responseText);
        }
    });
}

addFloodedAreaMap20m(waterAreaBuffered20mLayer);
addFloodedRoadsMap20m(floodedRoads20mLayer);
addFloodedIntersectionMap20m(floodedIntersections20mLayer);

//Show/hide road layer based on zoom level
// map.on('zoomend', function() {
//     //console.log('Zoom level changed:', map.getZoom());
//     var zoomLevel = map.getZoom();
//     if (zoomLevel > 13) {
//         map.addLayer(roadsLayer);
//     } else {
//         map.removeLayer(roadsLayer);
//     }
// });
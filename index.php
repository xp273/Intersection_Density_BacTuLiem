<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Index</title>

        <!-- Make sure you put this AFTER Leaflet's CSS -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol/dist/L.Control.Locate.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-easybutton@2/src/easy-button.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet.vectorgrid/dist/leaflet.vectorgrid.css" />
        <link rel="stylesheet" href="jquery-ui-1.12.1.custom/jquery-ui.min.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css" />

        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://unpkg.com/geojson-vt@3.0.0/geojson-vt.js"></script>
        <script src="https://unpkg.com/leaflet.vectorgrid/dist/leaflet.vectorgrid.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>

        <script onload="requestBorders">
            function requestBorders(){
                fetch('/database_interaction/request_vectors_borders').
                then(response => response.json());
            };
        </script>    
        <style>
            #map{
                position: absolute;
                width: 100%;
                height: 100%; 
            }
        </style>       
    </head>
    <body>
        <div id="map"></div>
            <script src="app.js">       
                
            </script>
    </body>
</html>
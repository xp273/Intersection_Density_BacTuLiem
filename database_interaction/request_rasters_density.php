<?php
    header('Content-Type: application/json');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    #$server_name = 'PostgreSQL 15';
    $server_name = 'localhost';
    $database = 'Road_analysis';
    $port = '5432';
    $user = 'postgres';
    $password = 'xuanphat0327';

    $dsn = "pgsql:host = $server_name; dbname = $database; port = $port";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false
    ];
    $pdo = new PDO($dsn, $user, $password, $opt);
    $result = $pdo->query(' SELECT "fid", "intersection_density", ST_AsGeoJson(geom, 5) AS geojson FROM "intersection_density_wgs4326_wgs84" ');
    $features=[];
    foreach($result as $row){
        unset($row['geom']);
        $geometry=$row['geojson']=json_decode($row['geojson']);
        unset($row['geojson']);
        $feature=["type"=>"Feature", "geometry"=>$geometry, "properties"=>$row];
        array_push($features, $feature);
    }
    $featureCollection=["type"=>"FeatureCollection", "features"=>$features];
    echo json_encode($featureCollection, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    //File output
    //file_put_contents('latest_results_density.json', json_encode($featureCollection,  JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    //echo 'Dataprint complete!';



<?php

/**
 * Retourne la connexion à la B.D.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$con_db = new PDO("mysql:host=localhost;dbname=angular_db", "root", "", array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
?>
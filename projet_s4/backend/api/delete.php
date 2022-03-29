<?php

/**
 * Supprime une maison
 */

require 'connect.php';

// Récupération de l'ID de la maison

$postdata = file_get_contents("php://input");


$request = json_decode($postdata);
$id = htmlspecialchars($request->data);

// Suppression de la maison 

$select = $con_db->prepare("DELETE FROM maison where id_maison = ($id)");
$select->execute();

echo json_encode("suppression reussie");

?>
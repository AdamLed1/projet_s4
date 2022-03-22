<?php


/**
 * Retourne une maison
 */

require 'connect.php';

// Récupération de l'ID de la maison

$postdata = file_get_contents("php://input");

  
$maisons = [];

$request = json_decode($postdata);
$id_maison = htmlspecialchars($request->data);

$select = $con_db->prepare("SELECT * FROM maison where id_maison = ($id_maison)");
$select->execute();

$cpt = 0;

// Récupération et stockage des données de la B.D.

while($ligne = $select->fetch()) {

    $maisons[$cpt]['id_maison'] = $ligne['id_maison'];
    $maisons[$cpt]['surface_hab'] = $ligne['surface_hab'];
    $maisons[$cpt]['surface_jardin'] = $ligne['surface_jardin'];
    $maisons[$cpt]['prix'] = $ligne['prix'];
    $maisons[$cpt]['description'] = $ligne['description'];
    $maisons[$cpt]['voisinage'] = $ligne['voisinage'];
    $maisons[$cpt]['url'] = $ligne['url'];
    $maisons[$cpt]['id_commune'] = $ligne['id_commune'];
    $maisons[$cpt]['id_cat'] = $ligne['id_cat'];
    
    $cpt++;
} 
    
echo json_encode(['data'=>$maisons]);

?>
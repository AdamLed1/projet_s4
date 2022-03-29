<?php

/**
 * Insertion d'une maison
 */

require 'connect.php';

// Récupération de la maison

$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)) {
  
  $request = json_decode($postdata);
	
  $desc = htmlspecialchars($request->data->description);
	$url = htmlspecialchars($request->data->url);
  $surface_hab = htmlspecialchars($request->data->surface_hab);
	$surface_jardin = htmlspecialchars($request->data->surface_jardin);
  $voisinage = htmlspecialchars($request->data->voisinage);
	$id_commune = htmlspecialchars($request->data->id_commune);
  $id_cat = htmlspecialchars($request->data->id_cat);
	$prix = htmlspecialchars($request->data->prix);
	
	
  // Insertion de la maison dans la B.D.	
  
  $insert = $con_db->prepare("INSERT INTO maison(prix, description, url, surface_hab, surface_jardin, voisinage, id_commune, id_cat) VALUES (($prix),'($desc)', '($url)', ($surface_hab), ($surface_jardin), ($voisinage), ($id_commune), ($id_cat))");
  $insert->execute();

  echo json_encode("ajout reussie");

}  

?>
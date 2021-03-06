<?php

/**
 * Mise à jour d'une maison
 */

require 'connect.php';

// Récupération de la maison

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  
  $request = json_decode($postdata);
  
  $id = htmlspecialchars($request->data->id_maison);
  $desc = htmlspecialchars($request->data->description);
  $url = htmlspecialchars($request->data->url);
  $surface_hab = htmlspecialchars($request->data->surface_hab);
  $surface_jardin = htmlspecialchars($request->data->surface_jardin);
  $voisinage = htmlspecialchars($request->data->voisinage);
  $id_commune = htmlspecialchars($request->data->id_commune);
  $id_cat = htmlspecialchars($request->data->id_cat);
  $prix = htmlspecialchars($request->data->prix);
	
	
  // UPDATE de la maison dans la B.D.	
  
  $insert = $con_db->prepare("UPDATE maison SET prix = {$prix}, description = '{$desc}', url = '($url)', surface_hab = ($surface_hab), surface_jardin = ($surface_jardin), voisinage = ($voisinage), id_commune = ($id_commune), id_cat = ($id_cat) where id_maison = ($id)");
  $insert->execute();

  echo json_encode("update reussie");
}

?>
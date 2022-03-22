<?php

/**
 * Insertion d'une maison
 */

require 'connect.php';

// Récupération de la maison

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  
  $request = json_decode($postdata);
	
  /*if(trim($request->data->url) === '' || trim($request->data->desc) === '' || (int)$request->data->prix < 0 
  || (int)$request->data->surface_hab < 0 || (int)$request->data->surface_jardin < 0 
  || (int)$request->data->voisinage < 0 || (int)$request->data->voisinage > 1 || (int)$request->data->id_commune < 0 
  || (int)$request->data->id_cat < 0) {
    return http_response_code(400);
  }*/
	
  $desc = htmlspecialchars($request->data->description);
	$url = htmlspecialchars($request->data->url);
  $surface_hab = htmlspecialchars($request->data->surface_hab);
	$surface_jardin = htmlspecialchars($request->data->surface_jardin);
  $voisinage = htmlspecialchars($request->data->voisinage);
	$id_commune = htmlspecialchars($request->data->id_commune);
  $id_cat = htmlspecialchars($request->data->id_cat);
	$prix = htmlspecialchars($request->data->prix);
	
	
  // Insertion de la maison dans la B.D.	
  
  $insert = $con_db->prepare("INSERT INTO maison(prix, description, url, surface_hab, surface_jardin, voisinage, id_commune, id_cat) VALUES ({$prix},'{$desc}', '($url)', ($surface_hab), ($surface_jardin), ($voisinage), ($id_commune), ($id_cat))");
  $insert->execute();

  http_response_code(201);
  $maison = [
    'prix' => $prix,
    'description' => $desc,
    'url' => $url,
	  'surface_hab' => $surface_hab,
    'surface_jardin' => $surface_jardin,
    'voisinage' => $voisinage,
    'id_commune' => $id_commune,
    'id_cat' => $id_cat
  ];
    echo json_encode(['data'=>$maison]);
}
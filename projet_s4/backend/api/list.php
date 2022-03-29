<?php

/**
 * Retourne la liste des maisons
 */
require 'connect.php';

// Récupération de l'ID de la maison

$postdata = file_get_contents("php://input");

$maisons = [];


$sql = "SELECT id_maison, surface_hab, surface_jardin, prix, description, url, voisinage, id_commune, id_cat FROM maison";

// Si $postdata a récupéré des données envoyées par post, passage dans la condition if

if (isset($postdata) && !empty($postdata)) {
				
	$requete = json_decode($postdata);

	$compteur = 0;

	// Stockage des données récupérées et initialisation des morceaux de requête

	$nb_pieces = htmlspecialchars($requete->data->nb_pieces);
	$pieces = "";
	$surface_hab_min = htmlspecialchars($requete->data->surface_hab_min);
	$surface_h_min = "";
	$surface_jard_min = htmlspecialchars($requete->data->surface_jard_min);
	$surface_j_min = "";
	$ville = intval(htmlspecialchars($requete->data->ville));
	$vil = "";
	$voisinage = intval(htmlspecialchars($requete->data->voisinage));
	$voisins = "";
	$prix_max = htmlspecialchars($requete->data->prix_max);
	$p_max = "";
	
	// Pour chaque champ modifié dans le formulaire, on construit un morceau de requête en fonction du précédent (avec ou sans 'and') à l'aide de $compteur

	if ($nb_pieces != 0) {
		if ($compteur == 0) {
			$pieces = " where id_cat = ($nb_pieces)";
			
			$compteur++;
		} else {
			$pieces = " and id_cat = ($nb_pieces)";
		}

		// Concaténation avec la requête $sql

		$sql = $sql . $pieces;
	}	

	if ($surface_hab_min != 0) {
		if ($compteur == 0) {
			$surface_h_min = " where surface_hab > ($surface_hab_min)";
			
			$compteur++;
		} else {
			$surface_h_min = " and surface_hab > ($surface_hab_min)";
		}
		$sql = $sql . $surface_h_min;
	}	

	if ($surface_jard_min != 0) {
		if ($compteur == 0) {
			$surface_j_min = " where surface_jardin > ($surface_jard_min)";
			
			$compteur++;
		} else {
			$surface_j_min = " and surface_jardin > ($surface_jard_min)";
		}
		$sql = $sql . $surface_j_min;
	}	

	if ($ville != 0) {
		if ($compteur == 0) {
			$vil = " where id_commune = ($ville)";
			
			$compteur++;
		} else {
			$vil = " and id_commune = ($ville)";
		}
		$sql = $sql . $vil;
	}	

	if ($voisinage != 2) {
		if ($compteur == 0) {
			$voisins = " where voisinage = ($voisinage)";
			
			$compteur++;
		} else {
			$voisins = " and voisinage = ($voisinage)";
		}
		$sql = $sql . $voisins;
	}	

	if ($prix_max != 0) {
		if ($compteur == 0) {
			$p_max = " where prix < ($prix_max)";
			
			$compteur++;
		} else {
			$p_max = " and prix < ($prix_max)";
		}
		$sql = $sql . $p_max;
	}
	
	// Envoi de la requête finale
	
	$select = $con_db->prepare($sql);
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
	
	
} else {
	// Si aucune donnée n'est reçue par post, passage dans le else

	// Envoi de la requête de base

	$select = $con_db->prepare($sql);
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
}

?>
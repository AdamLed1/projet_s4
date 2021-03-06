<?php

/**
 * Vérification des données pour l'authentification
 */

require 'connect.php';
	
// Récupération des données d'authentification	
			
$postdata = file_get_contents("php://input");
			
if (isset($postdata) && !empty($postdata)) {
				
	$requete = json_decode($postdata);
				
	$login = htmlspecialchars($requete->data->login);
	$mdp = htmlspecialchars($requete->data->mdp);
		
  $t=array($login);
  
	// Récupération du mot de passe

	$select = $con_db->prepare('SELECT login, mdp FROM administrateur where login=?');
	$select->execute($t);
	$tab = $select->fetch();
	$row = $select->rowCount();
				
	if ($row > 0) {
		
		// Vérification du mot de passe
		
		$mdp = hash('sha256', $mdp);
		if ($tab['mdp'] === $mdp) {
			http_response_code(201);
			$utilisateur = [
				'login' => $login,
				'mdp' => $mdp,
			];
			echo json_encode(['data'=>$utilisateur]);
		} else {
			http_response_code(401);
		}		
	}			
}					
?>
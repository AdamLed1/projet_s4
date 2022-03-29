import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {NgForm} from "@angular/forms";
import {Utilisateur} from "../utilisateur";
import {MaisonService} from "../services/maison.service";
import {Maison} from "../maison";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private coService : ConnexionService, private maisonService : MaisonService) { }

  connecte: boolean = false;

  utilisateurs: Utilisateur[] = [];
  utilisateur: Utilisateur = {login:'', mdp:''};

  maisons: Maison[] = [];
  maison: Maison = {surface_hab:0, surface_jardin:0, prix:0, description:"", url:"", voisinage:0, id_commune:0, id_cat:0, id_maison:0};

  error='';
  success='';

  ngOnInit() {
    this.getMaisons();
  }

  // FONCTION QUI PERMET DE CONNECTER L'ADMINISTRATEUR
  connexionUtilisateur(form: NgForm) {

    this.coService.verifConnexion(this.utilisateur).subscribe(
      (res: Utilisateur) => {
        this.utilisateurs.push(res)
        this.success = 'connexion reussie';
        this.connecte = true;
        form.reset();
      },
      (err) => (this.error = err.message)
    );
  }

  // FONCTION DE DECONNEXION
  deconnexion() {
    this.connecte = false;
  }

  // RECUPERATION DES MAISONS POUR AFFICHAGE
  getMaisons() {
    this.maisonService.getAll().subscribe(
      (data: Maison[]) => {
        this.maisons = data;
        this.supprimerParentheses();

        this.success = '';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  // TRAITEMENT DES CHAMPS STRING, NECESSITE DE RETIRER LES PARENTHESES GENEREES PAR L'ENVOI EN B.D.
  supprimerParentheses() {
    for (let i = 0; i < this.maisons.length; i++) {
      this.maisons[i].url = this.maisons[i].url.slice(1, this.maisons[i].url.length-1);
      this.maisons[i].description = this.maisons[i].description.slice(1, this.maisons[i].description.length-1);
    }
  }

  // MISE A JOUR DE L'AFFICHAGE DE LA MAISON
  mettreAJourMaison(id_maison: number) {
    for (let i = 0; i < this.maisons.length; i++) {
      if (this.maisons[i].id_maison == id_maison) {

        this.maison.id_maison = this.maisons[i].id_maison;
        this.maison.url = this.maisons[i].url;
        this.maison.id_cat = this.maisons[i].id_cat;
        this.maison.prix = this.maisons[i].prix;
        this.maison.surface_hab = this.maisons[i].surface_hab;
        this.maison.surface_jardin = this.maisons[i].surface_jardin;
        this.maison.description = this.maisons[i].description;
        this.maison.id_commune = this.maisons[i].id_commune;
        this.maison.voisinage = this.maisons[i].voisinage;
      }
    }
  }
  // MISE A JOUR DE L'AFFICHAGE APRES ENVOI VERS LA B.D.
  mettreAJourApresEnvoi(id_maison: number) {
    for (let i = 0; i < this.maisons.length; i++) {
      if (this.maisons[i].id_maison == id_maison) {

        this.maisons[i].url = this.maison.url;
        this.maisons[i].id_cat = this.maison.id_cat;
        this.maisons[i].prix = this.maison.prix;
        this.maisons[i].surface_hab = this.maison.surface_hab;
        this.maisons[i].surface_jardin = this.maison.surface_jardin;
        this.maisons[i].description = this.maison.description;
        this.maisons[i].id_commune = this.maison.id_commune;
        this.maisons[i].voisinage = this.maison.voisinage;
      }
    }
  }

  // FONCTION QUI ENVOIE LA MISE A JOUR D'UN BIEN DANS LA B.D.
  envoiMiseAJour(form: NgForm) {

    console.log(this.maison);
    this.maisonService.update(this.maison).subscribe(
      () => {
        this.success = 'update reussie';

        this.mettreAJourApresEnvoi(this.maison.id_maison);

        form.reset();
        this.maison.prix = 0;

      },
      (err) => (this.error = err.message)
    );

  }

  // FONCTION QUI DEMANDE UNE SUPPRESSION D'UN BIEN A LA B.D. PAR ID
  supprimerMaison(id_maison :number) {

    this.maisonService.deleteById(id_maison).subscribe(
      () => {

        this.supprimerMaisonDeLaListe(id_maison);

        this.success = 'suppression reussie';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  // SUPPRESSION DYNAMIQUE DE LA MAISON SUPPRIMEE DANS LA B.D.
  supprimerMaisonDeLaListe(id_maison: number) {

    for (let i = 0; i < this.maisons.length; i++) {
      if (this.maisons[i].id_maison == id_maison) {
        this.maisons.splice(i, 1);

      }
    }
  }

  // FONCTION QUI DEMANDE L'AJOUT D'UNE MAISON DANS LA B.D.
  ajoutMaison(form: NgForm) {

    this.maisonService.add(this.maison).subscribe(
      () => {
        this.success = 'ajout reussie';

        form.reset();

      },
      (err) => (this.error = err.message)
    );

  }

}

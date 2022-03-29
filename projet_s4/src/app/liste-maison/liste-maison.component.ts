import { Component, OnInit } from '@angular/core';
import {Maison} from "../maison";
import {MaisonService} from "../services/maison.service";

@Component({
  selector: 'app-liste-maison',
  templateUrl: './liste-maison.component.html',
  styleUrls: ['./liste-maison.component.css']
})
export class ListeMaisonComponent implements OnInit {

  maisons: Maison[] = [];
  comparaison : Maison[] = [];
  maison: Maison = {surface_hab:0, surface_jardin:0, prix:0, description:"", url:"", voisinage:0,
    id_commune:0, id_cat:0, id_maison:0};

  reception = false;
  error = '';
  success = '';

  preferences = {surface_h:1, surface_j:1, prix:1, nb_pieces:1, voisins:1, scoreMaison1: 0, scoreMaison2: 0,
    deltasurface_h: 0, deltasurface_j: 0, deltaPrix: 0, deltaNbPieces: 0};

  constructor(private maisonService: MaisonService) {
  }

  ngOnInit() {
    this.getMaisons();
  }

  // RECUPERATION DES BIENS DEPUIS LA B.D.
  getMaisons(): void {

    this.maisonService.getAll().subscribe(
      (data: Maison[]) => {
        console.log(data);
        this.maisons = data;
        this.supprimerParentheses();

        if (!this.reception) {
          this.reception = true;
        }
        this.success = 'affichage maisons';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  // SUPPRESSION DES PARENTHESES GENEREES PAR LA B.D.
  supprimerParentheses() {
    for (let i = 0; i < this.maisons.length; i++) {
      this.maisons[i].url = this.maisons[i].url.slice(1, this.maisons[i].url.length-1);
      this.maisons[i].description = this.maisons[i].description.slice(1, this.maisons[i].description.length-1);
    }
  }

  // FONCTION QUI AJOUTE UN BIEN DANS LE TABLEAU DES MAISONS A COMPARER VIA SON ID
  scoreMaison(id : number): boolean {

    let maison = this.maisons.filter(m => m.id_maison == id).pop();
    if (this.comparaison.length <= 1) {

      // @ts-ignore
      if (this.comparaison.find(m => m.id_maison == maison.id_maison)) {
      } else {
        // @ts-ignore
        this.comparaison.push(maison);
        return true;
      }
    } else {
      console.log("comparaison uniquement avec deux maisons");
    }
    return false;
  }

  // RETIRE UN BIEN DE LA COMPARAISON
  retirerDeLaComparaison() {
    if (this.comparaison.length != 0) {
      this.comparaison.shift();
    }
  }

  // FONCTION QUI AFFICHE LES DIFFERENCES DE CARACTERISTIQUES ENTRE LES BIENS
  differences() {

    let prix1: number = +this.comparaison[0].prix;
    let prix2: number = +this.comparaison[1].prix;
    let deltaPrix = prix1 - prix2;
    deltaPrix = deltaPrix * 100;

    this.preferences.deltaPrix = deltaPrix/prix1;

    // @ts-ignore
    this.preferences.deltaPrix = Math.round(this.preferences.deltaPrix).toFixed(0);

    let surface_h1: number = +this.comparaison[0].surface_hab;
    let surface_h2: number = +this.comparaison[1].surface_hab;
    let deltaSurface_h = surface_h1 - surface_h2;
    deltaSurface_h = deltaSurface_h * 100;

    this.preferences.deltasurface_h = deltaSurface_h/surface_h1;

    // @ts-ignore
    this.preferences.deltasurface_h = Math.round(this.preferences.deltasurface_h).toFixed(0);

    let surface_j1: number = +this.comparaison[0].surface_jardin;
    let surface_j2: number = +this.comparaison[1].surface_jardin;
    let deltaSurface_j = surface_j1 - surface_j2;
    deltaSurface_j = deltaSurface_j * 100;


    this.preferences.deltasurface_j = deltaSurface_j/surface_j1;

    // @ts-ignore
    this.preferences.deltasurface_j = Math.round(this.preferences.deltasurface_j).toFixed(0);

    let nbPieces1: number = +this.comparaison[0].id_cat;
    let nbPieces2: number = +this.comparaison[1].id_cat;
    let deltaNbPieces = nbPieces1 - nbPieces2;
    deltaNbPieces = deltaNbPieces * 100;

    this.preferences.deltaNbPieces = deltaNbPieces/nbPieces1;

    // @ts-ignore
    this.preferences.deltaNbPieces = Math.round(this.preferences.deltaNbPieces).toFixed(0);

  }

  // FONCTION PRINCIPALE QUI MET EN PLACE LES DIFFERENTS COMPOSANTS A CALCULER POUR LA MISE EN PLACE DU SCORE
  calcul() {

    this.preferences.scoreMaison1 = 0;
    this.preferences.scoreMaison2 = 0;

    this.differences();

    let indice = 0;
    while (indice < 2) {

      let premierEntier = String(this.comparaison[indice].prix)[0];
      let commune = 0;

      if (this.comparaison[indice].id_commune == 1) {
        commune = 30 * 5;
      } else {
        commune = 10 * 5;
      }

      // @ts-ignore
      let prix = (-5*premierEntier) * this.preferences.prix;
      let surface_habitable = (this.comparaison[indice].surface_hab) * this.preferences.surface_h;
      let surface_jardin = (this.comparaison[indice].surface_jardin/2) * this.preferences.surface_j;
      let categorie = (this.comparaison[indice].id_cat*50) * this.preferences.nb_pieces;
      let voisins = (-this.comparaison[indice].voisinage*50) * this.preferences.voisins;

      if (indice == 0) {
        this.preferences.scoreMaison1 = prix + surface_habitable + surface_jardin + categorie + voisins + commune;
      } else {
        this.preferences.scoreMaison2 = prix + surface_habitable + surface_jardin + categorie + voisins + commune;

      }
      indice++;

    }
  }

}

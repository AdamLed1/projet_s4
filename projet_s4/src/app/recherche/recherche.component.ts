import { Component, OnInit } from '@angular/core';
import {MaisonService} from "../services/maison.service";
import {NgForm} from "@angular/forms";
import {Maison} from "../maison";
import {Recherche} from "../recherche";

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  constructor(private maisonService : MaisonService) { }

  error = ''
  success = ''

  maisons : Maison[] = [];
  recherche : Recherche = {nb_pieces: 0, surface_hab_min: 0, surface_jard_min: 0, ville: "0", voisinage: "2", prix_max: 0};


  ngOnInit(): void {
  }

  // FONCTION QUI ENVOI LES DONNEES NECESSAIRES A LA RECHERCHE DES BIENS PUIS LES RECEPTIONNES
  rechercherMaisons(form : NgForm) {

    this.maisons = [];

    console.log(this.recherche);

    this.maisonService.getResearch(this.recherche).subscribe(
      (data: Maison[]) => {
        this.maisons = data;
        this.supprimerParentheses();

        this.success = 'résultats trouvés :';

      },
      (err) => (this.error = err.message)
    );
  }

  // SUPPRIMME LES PARENTHESES GENEREES PAR LE B.D.
  supprimerParentheses() {
    for (let i = 0; i < this.maisons.length; i++) {
      this.maisons[i].url = this.maisons[i].url.slice(1, this.maisons[i].url.length-1);
      this.maisons[i].description = this.maisons[i].description.slice(1, this.maisons[i].description.length-1);
    }
  }


}

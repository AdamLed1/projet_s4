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
  recherche : Recherche = {nb_pieces: 0, surface_hab_min: 0, surface_jard_min: 0, ville: 0, voisinage: 2, prix_max: 0};


  ngOnInit(): void {
  }

  rechercherMaisons(form : NgForm) {

    this.maisons = [];

    console.log(this.recherche);

    this.maisonService.getResearch(this.recherche).subscribe(
      (data: Maison[]) => {
        this.maisons = data;

        this.success = 'recherche réussie';

        form.reset();

      },
      (err) => (this.error = err.message)
    );

  }


}

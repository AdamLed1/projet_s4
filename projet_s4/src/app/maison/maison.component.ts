import {Component, Injectable, OnInit} from '@angular/core';
import {MaisonService} from "../services/maison.service";
import {ActivatedRoute} from "@angular/router";
import {Maison} from "../maison";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-maison',
  templateUrl: './maison.component.html',
  styleUrls: ['./maison.component.css']
})
export class MaisonComponent implements OnInit {

  maisons: Maison[] = [];
  maison: Maison = {surface_hab:0, surface_jardin:0, prix:0, description:"", url:"", voisinage:0, id_commune:0, id_cat:0, id_maison:0};
  error = '';
  success = '';


  constructor(private maisonService : MaisonService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.getMaison();
  }

  // RECEPTION DE LA MAISON
  getMaison() {
    this.maisonService.getById(this.route.snapshot.params['id']).subscribe(
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

  // SUPPRESSION DES PARENTHESES GENEREES PAR LA B.D.
  supprimerParentheses() {
    this.maisons[0].url = this.maisons[0].url.slice(1, this.maisons[0].url.length-1);
    this.maisons[0].description = this.maisons[0].description.slice(1, this.maisons[0].description.length-1);
  }


}

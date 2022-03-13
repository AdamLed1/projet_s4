import { Component, OnInit } from '@angular/core';
import {Maison} from "../maison";
import {MaisonService} from "../services/maison.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-liste-maison',
  templateUrl: './liste-maison.component.html',
  styleUrls: ['./liste-maison.component.css']
})
export class ListeMaisonComponent implements OnInit {

  maisons: Maison[] = [];
  maison: Maison = {surface_hab:0, surface_jardin:0, prix:0, description:"", url:"", voisinage:0};
  error = '';
  success = '';

  constructor(private maisonService: MaisonService) {
  }

  ngOnInit() {
    this.getMaisons();
  }

  addMaison(f: NgForm) {

    this.maisonService.store(this.maison).subscribe(
      (res: Maison) => {
        this.maisons.push(res)

        this.success = 'creation reussie';

        f.reset();
      },
      (err) => (this.error = err.message)
    );
  }

  getMaisons(): void {

    this.maisonService.getAll().subscribe(
      (data: Maison[]) => {
        this.maisons = data;
        this.success = '';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }

}

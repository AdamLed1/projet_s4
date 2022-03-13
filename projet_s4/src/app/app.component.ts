import {Component, OnInit} from '@angular/core';
import { NgForm} from "@angular/forms";

import { Maison } from './maison';
import { MaisonService} from "./services/maison.service";
import {ListeMaisonComponent} from "./liste-maison/liste-maison.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ComparImmo';

  /*maisons: Maison[] = [];
  maison: Maison = {surface_hab:0, surface_jardin:0, prix:0, description:"", url:"", voisinage:0};
  error = '';
  success = '';
*/
  constructor(private maisonService: MaisonService) {
  }

  /*ngOnInit() {
  }*/
/*
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
        this.success = 'maisons recuperees';
      },
      (err) => {
        console.log(err);
        this.error = err;
      }
    );
  }*/
}

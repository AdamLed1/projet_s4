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

  constructor() {
  }

}

import { Component, OnInit } from '@angular/core';
import {ConnexionService} from "../services/connexion.service";
import {Router} from "@angular/router";
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
  }

  connexionUtilisateur(form: NgForm) {

    this.coService.verifConnexion(this.utilisateur).subscribe(
      (res: Utilisateur) => {

        this.utilisateurs.push(res)


        console.log(this.connecte)
        this.success = 'connexion reussie';
        this.connecte = true;
        console.log(this.connecte);


        form.reset();
      },
      (err) => (this.error = err.message)
    );
  }

  deconnexion() {
    this.connecte = false;
  }


  ajoutMaison(form: NgForm) {

    console.log(this.maison);
    this.maisonService.add(this.maison).subscribe(
      (res: Maison) => {
        this.maisons.push(res)

        this.success = 'ajout reussie';

        form.reset();

      },
      (err) => (this.error = err.message)
    );

  }

}

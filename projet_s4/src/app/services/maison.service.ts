import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {Maison} from '../maison';
import {Recherche} from "../recherche";

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

  // CHEMIN VERS LE SERVEUR LOCAL
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {
  }

  // RECEPTION D'UN BIEN PAR ID
  getById(id_maison : number) {
    return this.http.post(`${this.baseUrl}/element.php`, { data: id_maison}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  // SUPPRESSION D'UN BIEN PAR ID
  deleteById(id_maison : number) {
    return this.http.post(`${this.baseUrl}/delete.php`, { data: id_maison},
      {responseType: "text"});
  }

  // RECEPTION DES BIENS CORRESPONDANT A LA RECHERCHE
  getResearch(recherche: Recherche) {
    return this.http.post(`${this.baseUrl}/list.php`, {data: recherche}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  // RECEPTION DE TOUS LES BIENS
  getAll() {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  // UPDATE DE LA MAISON EN QUESTION
  update(maison : Maison) {
    return this.http.post(`${this.baseUrl}/update.php`, { data: maison},
      {responseType: "text"});
  }

  // AJOUT D'UNE MAISON
  add(maison : Maison) {
    return this.http.post(`${this.baseUrl}/insertion.php`, { data: maison},
      { responseType: "text"});
  }
}

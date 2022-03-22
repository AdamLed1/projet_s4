import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Maison } from '../maison';
import {Recherche} from "../recherche";

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

  // CHEMIN VERS LE SERVEUR LOCAL
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {
  }

  getById(id_maison : number) {
    return this.http.post(`${this.baseUrl}/element.php`, { data: id_maison}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  getResearch(recherche: Recherche) {
    return this.http.post(`${this.baseUrl}/list.php`, {data: recherche}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }


  getAll() {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  add(maison : Maison) {
    return this.http.post(`${this.baseUrl}/insertion.php`, { data: maison}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}

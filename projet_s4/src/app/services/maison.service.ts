import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Maison } from '../maison';

@Injectable({
  providedIn: 'root'
})
export class MaisonService {

  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {
  }


//`${this.baseUrl}/list`

  getAll() {
    return this.http.get(`${this.baseUrl}/list.php`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  store(maison : Maison) {
    return this.http.post(`${this.baseUrl}/store.php`, { data: maison}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}

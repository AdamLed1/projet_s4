import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {Maison} from "../maison";
import {Utilisateur} from "../utilisateur";


@Injectable({
  providedIn: 'root'
})

export class ConnexionService {

  // CHEMIN VERS LE SERVEUR LOCAL
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {
  }


  verifConnexion(utilisateur: Utilisateur) {

    console.log(utilisateur);
    return this.http.post(`${this.baseUrl}/authentification.php`, { data: utilisateur}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}

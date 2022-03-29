import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {Utilisateur} from "../utilisateur";


@Injectable({
  providedIn: 'root'
})

export class ConnexionService {


  // CHEMIN VERS LE SERVEUR LOCAL
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {
  }

  // REQUETE POST POUR VERIFIER LES DONNEES DE CONNEXION
  verifConnexion(utilisateur: Utilisateur) {

    return this.http.post(`${this.baseUrl}/authentification.php`, { data: utilisateur}).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}

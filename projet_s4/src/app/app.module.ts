import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeMaisonComponent } from './liste-maison/liste-maison.component';
import { AccueilComponent } from './accueil/accueil.component';
import {RouterModule, Routes} from "@angular/router";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ConnexionComponent } from './connexion/connexion.component';
import { MaisonService } from "./services/maison.service";
import { ConnexionService } from "./services/connexion.service";
import { MaisonComponent } from './maison/maison.component';
import { RechercheComponent } from './recherche/recherche.component';

const appRoutes: Routes = [
  { path: 'liste', component: ListeMaisonComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'liste/:id', component: MaisonComponent },
  { path: 'recherche/:id', component: MaisonComponent},
  { path: 'authentification', component: ConnexionComponent },
  { path: 'recherche', component: RechercheComponent},
  { path: '', component: AccueilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListeMaisonComponent,
    AccueilComponent,
    ConnexionComponent,
    MaisonComponent,
    RechercheComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeMaisonComponent } from './liste-maison/liste-maison.component';
import { AccueilComponent } from './accueil/accueil.component';
import {RouterModule, Routes} from "@angular/router";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

const appRoutes: Routes = [
  { path: 'liste', component: ListeMaisonComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: '', component: AccueilComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListeMaisonComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

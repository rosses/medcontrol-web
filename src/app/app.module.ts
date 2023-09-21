import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './components/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { RutModule } from 'rut-chileno';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgbModalModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxRutModule } from '@numetalsour/ngx-rut';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    //RutModule,
    GooglePlaceModule,
    NgbModule,
    NgbModalModule,
    NgbNavModule,
    InputMaskModule,
    NgxRutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

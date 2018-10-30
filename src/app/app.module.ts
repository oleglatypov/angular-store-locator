import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AgmCoreModule } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PanelComponent } from './panel/panel.component';

import { MapsService } from './maps.service';
import { LocationsService } from './locations.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'Enter API KEY',
      libraries: ['places']
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LocationsService, MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

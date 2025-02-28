import { Component, OnInit} from '@angular/core';
import { FlightService } from '../../services/flight.service';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { Aeroport } from 'src/app/model/aeroport.model';
import { AeroportsService } from 'src/app/services/aeroports.service';
import { Router } from '@angular/router';
import { AuthService } from  '../../services/auth.service';

import { TranslateService } from '@ngx-translate/core';
import { Vol } from '../../model/rechercheVols/vol';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent  implements OnInit{
  selectedOriginValue: Aeroport= {};
  selectedDestinationValue: Aeroport= {};

  origin: string = '';
  destination: string = '';
  flights: Vol[] = [];

  origins: Aeroport[] = [];
  destinations: Aeroport[] = [];

  currentVol: Vol = {};
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private flightService: FlightService,
    private aeroportService: AeroportsService,
    private authService: AuthService, 
    private router: Router,
    private location: Location) { }

  searchFlights(origin: Aeroport,destination: Aeroport) {
    this.origin = origin.idAero;
    this.destination = destination.idAero;
    this.flightService.getFlights(this.origin, this.destination)
      .subscribe((data: Vol[]) => {
        this.flights = data;
        this.count = data.length;
      });
  }

  ngOnInit() {
    this.retrieveVols();
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};


    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveVols(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.aeroportService.getAll(params)
    .subscribe(
      response => {
        //const { aeroports} = response;
        this.origins = response;
        this.destinations = response;
        console.log(this.origins);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveVols();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveVols();
  }

  refreshList(): void {
    this.retrieveVols();
    this.currentVol= {};
    this.currentIndex = -1;
  }

  setActiveVol(tutorial: Vol, index: number): void {
    this.currentVol = tutorial;
    this.currentIndex = index;
  }

  shareCurrentVol(){
    this.currentVol.villeDepart = this.selectedOriginValue.aeroVille;
    this.currentVol.villeArrivee = this.selectedDestinationValue.aeroVille;
    this.flightService.currentVol = this.currentVol;
  }

  goBack() {
    this.location.back();
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Aeroport } from 'src/app/model/aeroport.model';
import { Vol } from 'src/app/model/rechercheVols/vol';
import { AeroportsService } from 'src/app/services/aeroports.service';
import { AuthService } from 'src/app/services/auth.service';
import { FlightService } from 'src/app/services/flight.service';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation
import { ColisService } from 'src/app/services/colis.service';
import { User } from 'src/app/model/user.model';
import { PriseCharge } from 'src/app/model/prise-charge.model';
import { Colis } from 'src/app/model/colis.model';
import { Statuts } from 'src/app/model/statuts';
import { PriseChargeService } from 'src/app/services/prise-charge.service';


@Component({
  selector: 'app-prise-charge-search',
  templateUrl: './prise-charge-search.component.html',
  styleUrls: ['./prise-charge-search.component.scss']
})
export class PriseChargeSearchComponent {
  priseEnCharge: PriseCharge = {};
  dateDepart: Date = new Date;
  dateArrivee: Date = new Date;

  selectedOriginValue: Aeroport = {};
  selectedDestinationValue: Aeroport = {};
  lstColis: any[] = [];

  idVol: string = '';
  origin: string = '';
  destination: string = '';
  flights: Vol[] = [];
  user?: User | null;

  origins: Aeroport[] = [];
  destinations: Aeroport[] = [];

  currentVol: Vol = {};
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  errorMessage: string = '';
  errorVol: string = '';

  rechercheOk = false;

  constructor(private flightService: FlightService,
    private aeroportService: AeroportsService,
    private authService: AuthService,
    private router: Router,
    public colisService: ColisService,
    private priseChargeService: PriseChargeService,
    private location: Location) {

    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  searchFlights(origin: Aeroport, destination: Aeroport) {
    this.origin = origin.idAero;
    this.destination = destination.idAero;
    this.flightService.getFlights(this.origin, this.destination)
      .subscribe((data: Vol[]) => {
        this.flights = data;
        this.count = data.length;
      });
  }

  searchScheduledFlight(idVol: string, origin: Aeroport, destination: Aeroport) {
    const statut = "scheduled";
    this.errorMessage = '';
    this.errorVol = '';
    this.idVol = idVol;
    this.origin = origin.idAero;
    this.destination = destination.idAero;
    this.flightService.findByTrajetAndIdAndStatut(this.origin, this.destination, idVol, statut)
      .subscribe ({
        next: (data: Vol) => { 
          this.currentVol = data;
          this.currentVol.villeDepart= origin.aeroVille;
          this.currentVol.villeArrivee= destination.aeroVille;
        },
        error: (error) =>{
          this.errorVol = error.error;
        }
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
      .subscribe({
        next: (response) => { 
          this.origins = response;
         this.destinations = response;
        },
        error: (error) =>{
          console.log(error);
        }
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
    this.currentVol = {};
    this.currentIndex = -1;
    this.rechercheOk = false;
  }

  setActiveVol(tutorial: Vol, index: number): void {
    this.currentVol = tutorial;
    this.currentIndex = index;
  }

  shareCurrentVol() {
    this.currentVol.villeDepart = this.selectedOriginValue.aeroVille;
    this.currentVol.villeArrivee = this.selectedDestinationValue.aeroVille;
    this.flightService.currentVol = this.currentVol;
  }

  getListColisForJourney(origin: Aeroport, destination: Aeroport) {
    this.lstColis = [];
    this.rechercheOk = true;
    const statutCree = 1;
    if (origin.aeroVille && destination.aeroVille) {

      this.priseEnCharge.villeDepart = origin.aeroVille;
      this.priseEnCharge.villeArrivee = destination.aeroVille;

      if(this.currentVol.departure?.scheduled &&this.currentVol.arrival?.scheduled) {
        this.priseEnCharge.dateDepart = this.currentVol.departure?.scheduled;
        this.priseEnCharge.dateArrivee= this.currentVol.arrival?.scheduled;
      }

      this.colisService.getListByTrajetAndStatutForUser(origin.aeroVille, destination.aeroVille, this.user?.idUser, statutCree)
        .subscribe({
          next: (data) => { 
            this.lstColis = data; 
          },
          error: (error) =>{
            this.errorMessage = error.error;
          }
        });
    }

  }

  details(idColis: any) {
    this.router.navigate(['/colis', idColis]); // Utilisez navigate pour rediriger
  }

  prendreEnCharge(colis: Colis) {
    alert('Colis pris en charge');
    let statutPriseEnCharge = new Statuts(2, "ACCEPTEE");
    this.priseEnCharge.statuts = statutPriseEnCharge;
    colis.statuts = statutPriseEnCharge;
    this.priseEnCharge.colis = colis;
    if (this.user)
      this.priseEnCharge.users = this.user;

    if (!this.idVol)
      this.priseEnCharge.idVol = "NO ID"
    else
      this.priseEnCharge.idVol = this.idVol;

      console.log('current vol :'+this.currentVol);
    this.priseEnCharge.dateDepart = this.currentVol.departure?.scheduled;
    this.priseEnCharge.dateArrivee = this.currentVol.arrival?.scheduled;

    console.log(this.priseEnCharge);
    this.priseChargeService.create(this.priseEnCharge)
      .subscribe({
        next: (response) => {
          console.log('Prise en charge enregistrée avec succès', response);
        },
        error: (e) => {
          console.error('Erreur lors de l\'enregistrement', e);
        }
      });

    //rafraichissement de la liste
    this.lstColis = [];
    this.getListColisForJourney(this.selectedOriginValue, this.selectedDestinationValue)

  }


  goBack() {
    this.location.back();
  }

}

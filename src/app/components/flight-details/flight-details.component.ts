import { Component, OnInit,Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AeroportVol } from '../../model/rechercheVols/aeroport-vol';
import { Airline } from '../../model/rechercheVols/airline';
import { Flight } from '../../model/rechercheVols/flight';
import { Statuts } from '../../model/statuts';
import { User } from '../../model/user.model';
import { UsersDispo } from '../../model/users-dispo';
import { AuthService } from '../../services/auth.service';
import { FlightService } from '../../services/flight.service';
import { Vol } from 'src/app/model/rechercheVols/vol';
import { DatePipe, Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit{

  user!: User | null;
  userdispo!:UsersDispo;
  nbKiloDispo:any ='';
  departAirport:string ='';
  arrivalAirport:string ='';
  villeDepart:string ='';
  villeArrivee:string ='';
  numvol:string ='';
  departDate:Date = new Date;
  arrivalDate:Date = new Date;
  

  @Input() viewMode = false;

  @Input() currentVol: Vol = {
    flight_date:new Date(),
	  flight_status: '',
	  departure: new AeroportVol(),
	  arrival: new AeroportVol(),
	  airline: new Airline(),
    flight : new Flight(),
    aircompagnieline: '',
    numVol: '',
  };
  
  message = '';

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private location: Location,
    private datePipe: DatePipe) { 

      this.authService.user.subscribe(x => this.user = x);
    
    }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
     this.currentVol = this.flightService.currentVol;
    }
  }

 
  creerTradeDispo(): void {
    if(this.currentVol && this.user){
      if(this.currentVol.numVol)
         this.numvol =this.currentVol.numVol;
      if(this.currentVol.departure?.airport)
         this.departAirport = this.currentVol.departure?.airport;
      if(this.currentVol.departure?.scheduled)
         this.departDate = this.currentVol.departure?.scheduled;
      if(this.currentVol.arrival?.airport)
         this.arrivalAirport = this.currentVol.arrival?.airport;
      if( this.currentVol.arrival?.scheduled)
         this.arrivalDate=  this.currentVol.arrival?.scheduled;
      if( this.currentVol.villeDepart)
         this.villeDepart=  this.currentVol.villeDepart;
      if( this.currentVol.villeArrivee)
         this.villeArrivee=  this.currentVol.villeArrivee;
       
      this.userdispo = new UsersDispo(
        null,
        this.numvol,
        this.villeDepart,
        this.departAirport,
        this.departDate,
        this.villeArrivee,
        this.arrivalAirport,
        this.arrivalDate,
        this.nbKiloDispo,
        this.user ,
        new Statuts(1,'CREE')
      );

    }
    this.flightService.createDispo(this.userdispo)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('transactions-list');
        },
        error: (e) =>{
          console.error('Erreur',e);
        } 
      });
  }

  formatDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '' : '';
  }
  
  goBack() {
    this.location.back();
  }
  
}


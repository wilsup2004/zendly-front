import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { Vol } from '../model/rechercheVols/vol';
import { UsersDispo } from '../model/users-dispo';

const baseUrl = 'http://192.168.1.21:8081/trade/flight'

const baseUrlDispo = 'http://192.168.1.21:8081/trade/usersDispo'

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  currentVol: Vol = {};

  constructor(private http: HttpClient) { }


  getFlights(origin: string, destination: string): Observable<Vol[]> {
    return this.http.get<Vol[]>(`${baseUrl}/search?idOrigine=${origin}&idDestination=${destination}`);
  }

  createDispo(data: UsersDispo): Observable<any> {
    return this.http.post(baseUrlDispo, data,{responseType: 'text'});
  }

  findByTrajetAndIdAndStatut(origin: string, destination: string, idVol:string, statut:string): Observable<Vol> {
    return this.http.get<Vol>(`${baseUrl}/search/vol?idOrigine=${origin}&idDestination=${destination}&idVol=${idVol}&statut=${statut}`);
  }
}

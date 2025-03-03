import { Injectable } from '@angular/core';
import { PriseCharge } from '../model/prise-charge.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis } from '../model/colis.model';


const baseUrl = 'http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/trade/priseEnCharge'

@Injectable({
  providedIn: 'root'
})
export class PriseChargeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<PriseCharge[]>(baseUrl);
  }

  getById(idPrise: any): Observable<any> {
    return this.http.get<PriseCharge>(`${baseUrl}/${idPrise}`);
  }

  getByColis(idColis: any): Observable<any> {
    return this.http.get<PriseCharge>(`${baseUrl}/colis/${idColis}`);
  }

  getAllByStatut(idStatut: any): Observable<any> {
    return this.http.get<PriseCharge[]>(`${baseUrl}?statut=${idStatut}`);
  }

  getListByUserAndStatut(userNom: string, idStatut: any): Observable<any> {
    return this.http.get<PriseCharge[]>(`${baseUrl}/userstatut?userNom=${userNom}&statut=${idStatut}`);
  }

  getListEnCoursByUser(userNom: string): Observable<any> {
    return this.http.get<PriseCharge[]>(`${baseUrl}/userstatut?userNom=${userNom}`);
  }

  create(priseEnCharge: PriseCharge): Observable<any> {

    return this.http.post(baseUrl, priseEnCharge, { responseType: 'text' });
  }

  update(idPrise: any, priseCharge: PriseCharge): Observable<any> {
    return this.http.put(`${baseUrl}/${idPrise}`, priseCharge, { responseType: 'text' });
  }

  annule(idPrise: any, priseCharge: PriseCharge): Observable<any> {
    return this.http.put(`${baseUrl}/annule/${idPrise}`, priseCharge, { responseType: 'text' });
  }

}

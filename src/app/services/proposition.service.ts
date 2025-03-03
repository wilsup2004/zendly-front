import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersDispo } from '../model/users-dispo';
import { Proposition } from '../model/proposition.model';

const baseUrl = 'http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/trade/usersProposition'

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  //nbKiloRestant: any =0;

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<Proposition[]>(baseUrl, { params });
  }

  get(idDispo: any): Observable<any> {
    return this.http.get<Proposition[]>(`${baseUrl}/${idDispo}`);
  }

  getAccept(idDispo: any): Observable<any> {
    return this.http.get<Proposition[]>(`${baseUrl}/accept?id=${idDispo}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(idDispo: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idDispo}`, data,{responseType: 'text'});
  }

  delete(idDispo: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${idDispo}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByCandidatAndStatut(userNom: string,idStatut:any): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${baseUrl}/candidatPropal?userNom=${userNom}&statut=${idStatut}`);
  }

  findByCandidatAndId(userNom: string,id:any): Observable<Proposition> {
    return this.http.get<Proposition>(`${baseUrl}/candidat?userNom=${userNom}&id=${id}`);
  }

  findByCandidat(userNom: string): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${baseUrl}/candidatPropal?userNom=${userNom}`);
  }


  findByInitiateur(userNom: string,idStatut:any): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${baseUrl}/initiateur?userNom=${userNom}&statut=${idStatut}`);
  }

}


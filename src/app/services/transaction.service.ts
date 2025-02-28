import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersDispo } from '../model/users-dispo';
import { PropositionInitial } from '../model/proposition-initial.model';

const baseUrl = 'http://192.168.1.21:8081/trade/usersDispo'

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<any> {
    return this.http.get<PropositionInitial[]>(baseUrl);
  }

  getAllHorsCandidat(userNom: string): Observable<any> {
    return this.http.get<PropositionInitial[]>(`${baseUrl}/horsUser?userNom=${userNom}`);
  }


  get(idDispo: any): Observable<any> {
    return this.http.get(`${baseUrl}/${idDispo}`);
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

  findByNom(userNom: string): Observable<UsersDispo[]> {
    return this.http.get<UsersDispo[]>(`${baseUrl}/search?userNom=${userNom}`);
  }

  findByTrajet(villeDepart: string,villeArrivee: string): Observable<UsersDispo[]> {
    return this.http.get<UsersDispo[]>(`${baseUrl}/searchAllBytrajet?villeDepart=${villeDepart}&villeArrivee=${villeArrivee}`);
  }

}

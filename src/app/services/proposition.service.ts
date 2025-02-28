import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersDispo } from '../model/users-dispo';
import { Proposition } from '../model/proposition.model';

const baseUrl = 'http://192.168.1.21:8081/trade/usersProposition'

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

/*
  calculNbKilorestant(idDispo:any,idCurrentUser: any, nbKiloDispo:any):any{
    let listPropositionsAccepted: Proposition[] =[];
    let nbKiloRestant = nbKiloDispo;

    this.getAccept(idDispo)
    .subscribe({
      next: (res) => {
        listPropositionsAccepted = res;
        console.log(listPropositionsAccepted);
        for(let propos of listPropositionsAccepted ){
          // if(propos.idUserCandidat != idCurrentUser)
          console.log("Nb kilo restant avant calcul ="+ nbKiloRestant);
          console.log("Nb kilo Acheté avant calcul ="+ propos.nbKiloAchete);
          nbKiloRestant =  nbKiloRestant - propos.nbKiloAchete;
           console.log("Nb kilo restant après calcul ="+ nbKiloRestant);
           
         }
      },
      error: (e) => console.error(e)
    });
    console.log(listPropositionsAccepted);
     console.log("Nb kilo restInit calcule ="+nbKiloRestant);
     return nbKiloRestant;
  }
  */

}


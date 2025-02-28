import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statuts } from '../model/statuts';

const baseUrl = 'http://192.168.1.21:8081/trade/statuts'

@Injectable({
  providedIn: 'root'
})
export class StatutsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Statuts[]>(baseUrl);
  }

  getAllFortransaction(): Observable<any> {
    return this.http.get<Statuts[]>(`${baseUrl}/transaction`);
  }

  getAllForProposition(): Observable<any> {
    return this.http.get<Statuts[]>(`${baseUrl}/proposition`);
  }

  getBackgroundColor(element: any): string {
    
    if (element === 'CREER') {
      return '#CC99FF';
    } else if (element === 'ACCEPTEE') {
      return '#9999FF';
    } else if (element === 'ANNULE') {
      return '#333F4F';
    } else if (element === 'PRISE_CHARGE') {
      return '#6699FF';
    } else if (element === 'CONFIRME_PRISE_CHARGE') {
      return '#0066CC';
    } else if (element === 'ANNUL_PRISE_CHARGE') {
      return '#333F4F';
    } else if (element === 'DELIVRE') {
      return '#009999';
    } else if (element === 'CONFIRME_RECEPTION') {
      return '#00CC99';
    } else if (element === 'CLOTURE') {
      return '#00B050';
    } else if (element === 'PROBLEME') {
      return 'red';
    }
    return 'black'; // Par défaut
  }



  getTextColor(element: any): string {

    if (element === 'CREE') {
      return 'black';
    } else if (element === 'EN_COURS') {
      return 'black';
    }
    return 'white'; // Par défaut
  }


}

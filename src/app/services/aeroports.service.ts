import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aeroport } from '../model/aeroport.model';

const baseUrl = 'http://192.168.1.21:8081/trade/aeroports'

@Injectable({
  providedIn: 'root'
})
export class AeroportsService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<Aeroport[]>(baseUrl, { params });
  }

  get(idAero: any): Observable<Aeroport> {
    return this.http.get(`${baseUrl}/${idAero}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(idAero: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idAero}`, data);
  }

  delete(idAero: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${idAero}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByNom(aeroNom: any): Observable<Aeroport[]> {
    return this.http.get<Aeroport[]>(`${baseUrl}/search?aeroNom=${aeroNom}`);
  }

 
}

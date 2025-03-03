import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

const baseUrl = 'http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/trade/users'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl, { params });
  }

  get(idUser: String): Observable<any> {
    return this.http.get(`${baseUrl}/${idUser}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(idUser: String, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${idUser}`, data);
  }

  delete(idUser: String): Observable<any> {
    return this.http.delete(`${baseUrl}/${idUser}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByNom(nom: String): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/search?nom=${nom}`);
  }

}

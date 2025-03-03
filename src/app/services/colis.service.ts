import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis } from '../model/colis.model';

const baseUrl = 'http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/trade/colis'

@Injectable({
  providedIn: 'root'
})
export class ColisService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Colis[]>(baseUrl);
  }

  getById(idColis: any): Observable<any> {
    return this.http.get<Colis>(`${baseUrl}/${idColis}`);
  }

  getAllByStatut(idStatut: any): Observable<any> {
    return this.http.get<Colis[]>(`${baseUrl}?statut=${idStatut}`);
  }

  getListByUserAndStatut(userNom: string, idStatut: any): Observable<any> {
    return this.http.get<Colis[]>(`${baseUrl}/userstatut?userNom=${userNom}&statut=${idStatut}`);
  }

  getListEnCoursByUser(userNom: string): Observable<any> {
    return this.http.get<Colis[]>(`${baseUrl}/userstatut?userNom=${userNom}`);
  }

  getListByTrajetAndStatut(origine: string, destination: string, idStatut: any): Observable<any> {
    return this.http.get<Colis[]>(`${baseUrl}/trajet?origine=${origine}&destination=${destination}&statut=${idStatut}`);
  }

  getListByTrajetAndStatutForUser(origine: string, destination: string, idUser: string, idStatut: any): Observable<any> {
    return this.http.get<Colis[]>(`${baseUrl}/trajet?origine=${origine}&destination=${destination}&idUser=${idUser}&statut=${idStatut}`);
  }

  getImage(id: number): string {
    return `${baseUrl}/image/${id}`;
  }


  create(colis: Colis): Observable<any> {
    const formData = new FormData();
    formData.append('idStatut', colis.statuts.idStatut);
    formData.append('idUser', colis.users.idUser);
    formData.append('longueur', colis.longueur);
    formData.append('largeur', colis.largeur);
    formData.append('hauteur', colis.hauteur);
    formData.append('nbKilo', colis.nbKilo);
    formData.append('tarif', colis.tarif);
    formData.append('villeDepart', colis.villeDepart);
    formData.append('villeArrivee', colis.villeArrivee);
    formData.append('description', colis.description);
    formData.append('photoPath', colis.photoPath);
    formData.append('file', colis.file);

    return this.http.post(baseUrl, formData, { responseType: 'text' });
  }

  update(colis: Colis): Observable<any> {
    const formData = new FormData();
    formData.append('idColis', colis.idColis);
    formData.append('idStatut', colis.statuts.idStatut);
    formData.append('idUser', colis.users.idUser);
    formData.append('longueur', colis.longueur);
    formData.append('largeur', colis.largeur);
    formData.append('hauteur', colis.hauteur);
    formData.append('nbKilo', colis.nbKilo);
    formData.append('tarif', colis.tarif);
    formData.append('villeDepart', colis.villeDepart);
    formData.append('villeArrivee', colis.villeArrivee);
    formData.append('description', colis.description);
    formData.append('photoPath', colis.photoPath);
    formData.append('file', colis.file);

    return this.http.put(baseUrl, formData, { responseType: 'text' });
  }

  annule(colis: Colis): Observable<any> {
      return this.http.put(`${baseUrl}/annule`, colis, { responseType: 'text' });
    }

}

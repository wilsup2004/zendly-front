import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

const baseUrl = 'http://ec2-35-180-172-219.eu-west-3.compute.amazonaws.com:8081/trade/users'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticated: boolean = false;
  private currentUserProfile: string = '';

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public seConnecter(userInfo: User){
    //localStorage.setItem('ACCESS_TOKEN', "access_token");
    const mail = userInfo.mail;
    const password = userInfo.password
    return this.http.get<User>(`${baseUrl}/auth?mail=${mail}&password=${password}`)
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.isAuthenticated = true;
       this.currentUserProfile = user.usersProfils[0].profil.libelProfil;
        return user;
    }));
  }

  public seDeconnecter(){
    //localStorage.removeItem('ACCESS_TOKEN');
    this.isAuthenticated = false;
    this.currentUserProfile = '';
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['connexion']);
  }

  public estConnecte(){
    //return localStorage.getItem('ACCESS_TOKEN') !== null;
    return this.isAuthenticated;
  }
  
  public getCurrentUserProfile(): string {
    return this.currentUserProfile;
  }

}

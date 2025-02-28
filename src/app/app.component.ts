//import { Component } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';

import { Component, HostBinding,ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importez le service Location
import { LanguageService } from './services/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TradeApp';

  selectedLanguage = 'fr';
  selectedTheme = 'light-theme';

  user?: User | null;
  idUser: any;
  nom : string ='';
  prenom: string ='';
  mail: string ='';
  profile : string ='';
  visible : boolean = false;
 
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  constructor(public observer: BreakpointObserver,
   // public translate: TranslateService,
   private languageService: LanguageService,
    private router: Router,
    public authService: AuthService,
    private location: Location) {

    /*
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  */

    this.authService.user.subscribe((user) => {
    this.user = user;
    if(this.user) {
      this.idUser = this.user.idUser;
      this.nom  =this.user.nom;
      this.prenom  = this.user.prenom;
      this.mail  = this.user.mail;
      this.profile  = this.user.usersProfils[0].profil.libelProfil;
      this.visible = true;
    }
  });
  }

  changeLanguage(language: string) {
    //this.translate.use(language);
    this.selectedLanguage = language;
    this.languageService.setLanguage(language);
    
  }

  changeTheme(theme: string) {
    this.selectedTheme = theme;
    document.body.className = theme;
  }

  isHandset$: Observable<boolean> = this.observer.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

 

  ngOnInit(){

 
   
   }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  isAdminOrSuperuser() {
    return this.user?.usersProfils[0].profil.libelProfil === 'ADMIN' || this.user?.usersProfils[0].profil.libelProfil=== 'SUPERUSER';
  }

  isAdmin() {
    return this.user?.usersProfils[0].profil.libelProfil=== 'ADMIN';
  }
  
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    // Logic to handle user logout
    this.authService.seDeconnecter();
    this.idUser ='';
    this.nom  ='';
    this. prenom  ='';
    this.mail  ='';
    this.profile  ='';
    this.visible = false;
  }

  goBack() {
    this.location.back();
  }

}

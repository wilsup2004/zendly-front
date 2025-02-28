import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('fr'); // Langue par défaut
  currentLanguage$ = this.languageSubject.asObservable(); // Observable pour suivre les changements

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.setLanguage(this.translate.getDefaultLang());
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.languageSubject.next(lang); // Met à jour la langue pour les autres composants
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value; // Récupère la langue actuelle
  }
}

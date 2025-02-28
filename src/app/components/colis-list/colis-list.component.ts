import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { ColisService } from 'src/app/services/colis.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { StatutsService } from 'src/app/services/statuts.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { Statuts } from 'src/app/model/statuts';
import { Colis } from 'src/app/model/colis.model';

@Component({
  selector: 'app-colis-list',
  templateUrl: './colis-list.component.html',
  styleUrls: ['./colis-list.component.scss']
})
export class ColisListComponent implements OnInit {
  lstColis: any[] = [];
  user?: User | null;
  errorColis = '';

  translatedStatutColis: string = '';
  currentLanguage: string = '';
  
  constructor(
    public authService: AuthService,
    public colisService: ColisService,
    private statutService: StatutsService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });

    let idUser = this.route.snapshot.params["idUser"];
    if (idUser) {
      this.colisService.getListEnCoursByUser(this.user?.idUser).subscribe({
        next: (data) => {
          this.lstColis = data;
          console.log(this.lstColis )
        },
        error: (error) => {
          this.errorColis = error.error;
        }
      });

    } else {
      this.colisService.getAll().subscribe({
        next: (data) => {
          this.lstColis = data;

        },
        error: (error) => {
          this.errorColis = error.error;
        }
      });
    }

  }

  updateTranslation(element: string): string {
    let wordtranslate = element;
    this.translate.get(element).subscribe(translatedText => {
      wordtranslate = translatedText;
    });
    return wordtranslate;
  }

  visibleActions(statutColis: string, typeBouton: string): boolean {
    let isVerified = false;
    if (typeBouton === 'Supprimer') {
      if (statutColis === 'CREER' || statutColis === 'ANNULE' || statutColis === 'ANNUL_PRISE_CHARGE')
        isVerified = true;

    } else if (typeBouton === 'Annuler') {
      if (statutColis === 'ACCEPTEE')
        isVerified = true;

    } else if (typeBouton === 'Annuler prise') {
      if (statutColis === 'PRISE_CHARGE')
        isVerified = true;

    } else if (typeBouton === 'Republier') {
      if (statutColis === 'ANNULE' || statutColis === 'ANNUL_PRISE_CHARGE')
        isVerified = true;

    }else if (typeBouton === 'Cloturer') {
      if (statutColis === 'CONFIRME_RECEPTION')
        isVerified = true;

    }else if (typeBouton === 'Details prise') {
      if (!(statutColis === 'CREER' || statutColis === 'ANNULE' || statutColis === 'ANNUL_PRISE_CHARGE'|| statutColis === 'SUPPRIME'))
        isVerified = true;

    }

    return isVerified;
  }

  getAlert(bouton: string) {
    alert(bouton);
  }

  annule(colis: Colis) {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNULE'
      let newStatut: Statuts = new Statuts(3, 'ANNULE');
      //if(this.colis)
      colis.statuts = newStatut;
      this.colisService.annule(colis)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge annulée', response);
          },
          error: (e) => {
            console.error('Erreur lors de l\'enregistrement', e);
          }
        });

      window.location.reload();

    } else {
      console.log("Annulé");
    }

  }

  annulePrise(colis: Colis) {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNULE'
      let newStatut: Statuts = new Statuts(6, 'ANNUL_PRISE_CHARGE');
      colis.statuts = newStatut;
      this.colisService.annule(colis)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge annulée', response);
          },
          error: (e) => {
            console.error('Erreur lors de l\'enregistrement', e);
          }
        });

      window.location.reload();

    } else {
      console.log("Annulé");
    }

  }

  supprimer(colis: Colis) {
    if (confirm("Êtes-vous sûr de vouloir supprimer la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(10, 'SUPPRIME');
      colis.statuts = newStatut;
      this.colisService.update(colis)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge supprimée', response);
          },
          error: (e) => {
            console.error('Erreur lors de l\'enregistrement', e);
          }
        });

      window.location.reload();

    } else {
      console.log("Annulé");
    }

  }

  cloturer(colis: Colis) {
    if (confirm("Êtes-vous sûr de vouloir cloturer la transaction ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(9, 'CLOTURE');
      colis.statuts = newStatut;
      this.colisService.update(colis)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge cloturée', response);
          },
          error: (e) => {
            console.error('Erreur lors de l\'enregistrement', e);
          }
        });

      window.location.reload();

    } else {
      console.log("Annulé");
    }

  }

  republier(colis: Colis) {
    if (confirm("Êtes-vous sûr de vouloir republier la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(1, 'CREER');
      colis.statuts = newStatut;
      this.colisService.update(colis)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge annulée', response);
          },
          error: (e) => {
            console.error('Erreur lors de l\'enregistrement', e);
          }
        });

      window.location.reload();

    } else {
      console.log("Annulé");
    }

  }


  getBackgroundColor(statuts: string) {
    return this.statutService.getBackgroundColor(statuts);
  }

  getTextColor(statuts: string) {
    return this.statutService.getTextColor(statuts);
  }

  details(idColis: any) {
    this.router.navigate(['/colis', idColis]); // Utilisez navigate pour rediriger
  }

  detailsPrise(idColis: any) {
    this.router.navigate(['/prise-charge/colis', idColis]); // Utilisez navigate pour rediriger
  }

  goBack() {
    this.location.back();
  }

}
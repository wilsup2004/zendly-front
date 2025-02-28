import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PriseChargeService } from 'src/app/services/prise-charge.service';
import { Location } from '@angular/common';
import { StatutsService } from 'src/app/services/statuts.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { PriseCharge } from 'src/app/model/prise-charge.model';
import { Statuts } from 'src/app/model/statuts';

@Component({
  selector: 'app-prise-charge-list',
  templateUrl: './prise-charge-list.component.html',
  styleUrls: ['./prise-charge-list.component.scss']
})
export class PriseChargeListComponent {
  lstPrise: any[] = [];
  user?: User | null;
  errorPrise = '';

  translatedStatutPrise: string = '';
  currentLanguage: string = '';


  constructor(
    public authService: AuthService,
    public priseChargeService: PriseChargeService,
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
      this.priseChargeService.getListEnCoursByUser(this.user?.idUser).subscribe({
        next: (data) => {
          this.lstPrise = data;
        },
        error: (error) => {
          this.errorPrise = error.error;
        }
      });

    } else {
      this.priseChargeService.getAll().subscribe({
        next: (data) => {
          this.lstPrise = data;
        },
        error: (error) => {
          this.errorPrise = error.error;
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

  visibleActions(statut: string, typeBouton: string): boolean {
    let isVerified = false;
    if (typeBouton === 'Annuler' || typeBouton === 'Prendre charge') {
      if (statut === 'ACCEPTEE')
        isVerified = true;

    } else if (typeBouton === 'Annuler prise') {
      if (statut === 'PRISE_CHARGE')
        isVerified = true;

    } else if (typeBouton === 'Delivrer') {
      if (statut === 'CONFIRME_PRISE_CHARGE')
        isVerified = true;

    } else if (typeBouton === 'Cloturer') {
      if (statut === 'CONFIRME_RECEPTION')
        isVerified = true;
 
    } else if (typeBouton === 'Supprimer') {
      if (statut === 'ANNULE' || statut === 'ANNUL_PRISE_CHARGE')
        isVerified = true;
 
    }

    return isVerified;
  }


  getAlert(bouton: string) {
    alert(bouton);
  }

  annule(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNULE'
      let newStatut: Statuts = new Statuts(3, 'ANNULE');
      if (priseCharge.colis)
        priseCharge.colis.statuts = newStatut;
      priseCharge.statuts = newStatut;
      this.priseChargeService.annule(priseCharge.idPrise, priseCharge)
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

  annulePrise(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNULE'
      let newStatut: Statuts = new Statuts(6, 'ANNUL_PRISE_CHARGE');
      if (priseCharge.colis)
        priseCharge.colis.statuts = newStatut;
      priseCharge.statuts = newStatut;
      this.priseChargeService.annule(priseCharge.idPrise, priseCharge)
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


  prendreCharge(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir prendre en charge le colis?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(5, 'CONFIRME_PRISE_CHARGE');
      if (priseCharge.colis)
        priseCharge.colis.statuts = newStatut;
      priseCharge.statuts = newStatut;
      this.priseChargeService.update(priseCharge.idPrise, priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge effectué', response);
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


  delivrer(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir cloturer la transaction ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(8, 'CONFIRME_RECEPTION');
      if (priseCharge.colis)
        priseCharge.colis.statuts = newStatut;
      priseCharge.statuts = newStatut;
      this.priseChargeService.update(priseCharge.idPrise, priseCharge)
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

  cloturer(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir cloturer la transaction ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(9, 'CLOTURE');
      if (priseCharge.colis)
        priseCharge.colis.statuts = newStatut;
      priseCharge.statuts = newStatut;
      this.priseChargeService.update(priseCharge.idPrise, priseCharge)
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

  supprimer(priseCharge: PriseCharge) {
    if (confirm("Êtes-vous sûr de vouloir cloturer la transaction ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(10, 'SUPPRIME');
      priseCharge.statuts = newStatut;
      this.priseChargeService.update(priseCharge.idPrise, priseCharge)
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


  details(idPrise: any) {
    this.router.navigate(['/prise-charge', idPrise]); // Utilisez navigate pour rediriger
  }

  goBack() {
    this.location.back();
  }


}

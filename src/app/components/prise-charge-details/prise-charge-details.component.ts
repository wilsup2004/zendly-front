import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { PriseCharge } from 'src/app/model/prise-charge.model';
import { AuthService } from 'src/app/services/auth.service';
import { PriseChargeService } from 'src/app/services/prise-charge.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Colis } from 'src/app/model/colis.model';
import { Statuts } from 'src/app/model/statuts';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { StatutsService } from 'src/app/services/statuts.service';

interface IpriseCharge {

  idPrise: any;
  colis: Colis;
  statuts: Statuts;
  users: User;
  idVol: string;
  villeDepart: string;
  dateDepart: Date;
  villeArrivee: string;
  dateArrivee: Date;

}


@Component({
  selector: 'app-prise-charge-details',
  templateUrl: './prise-charge-details.component.html',
  styleUrls: ['./prise-charge-details.component.scss']
})
export class PriseChargeDetailsComponent {

  priseCharge: PriseCharge = {};
  user?: User | null;
  form: FormGroup;
  idPrise: any;
  idColis: any;
  isUserPrise = false;
  isUserColis = false;
  isUserAdmin = false;
  colisStatut: any;
  priseStatut: any;
  currentLanguage: string = '';
  translatedStatutColis: string = '';
  translatedStatutPrise: string = '';

  isAccepte = false;
  isPrendCharge = false;
  isConfPrendCharge = false;
  isDelivre = false;
  isConfRecept = false;
  isCloture = false;
  isRepublie = false;

  isAnnule = false;
  isSupprime = false;
  isAnnulePrise = false;
  isProbleme = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private priseChargeService: PriseChargeService,
    private statutService: StatutsService,
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private datePipe: DatePipe) {

    this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.form = this.fb.group({
      idPrise: ['', Validators.nullValidator],
      statutPrise: ['', Validators.nullValidator],
      userPrise: ['', Validators.nullValidator],
      idVol: ['', Validators.nullValidator],
      villeDepart: ['', Validators.nullValidator],
      dateDepart: ['', Validators.nullValidator],
      villeArrivee: ['', Validators.nullValidator],
      dateArrivee: ['', Validators.nullValidator],

      statutColis: ['', Validators.nullValidator],
      userColis: ['', Validators.nullValidator],
      longueur: ['', Validators.nullValidator],
      largeur: ['', Validators.nullValidator],
      hauteur: ['', Validators.nullValidator],
      nbKilo: ['', Validators.nullValidator],
      tarif: ['', Validators.nullValidator],
      horodatage: ['', Validators.nullValidator],
      description: ['', Validators.nullValidator]

    });

  }


  ngOnInit(): void {

    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.updateTranslation();
    });
  
    this.idColis = this.route.snapshot.params["idColis"];
    if(this.idColis ) {
      console.log('On est dans colis:'+this.idColis);
      this.priseChargeService.getByColis(this.idColis)
        .subscribe(data => {
          this.priseCharge = data;
          this.idPrise =this.priseCharge.idPrise;
          this.form = this.fb.group({

            idPrise: [this.idPrise, Validators.nullValidator],
            statutPrise: [this.priseCharge.statuts?.libelStatut, Validators.nullValidator],
            userPrise: [this.priseCharge.users?.idUser, Validators.nullValidator],
            idVol: [this.priseCharge.idVol, Validators.nullValidator],
            villeDepart: [this.priseCharge.villeDepart, Validators.nullValidator],
            dateDepart: [this.priseCharge.dateDepart, Validators.nullValidator],
            villeArrivee: [this.priseCharge.villeArrivee, Validators.nullValidator],
            dateArrivee: [this.priseCharge.dateArrivee, Validators.nullValidator],

            statutColis: [this.priseCharge.colis?.statuts.libelStatut, Validators.nullValidator],

            userColis: [this.priseCharge.colis?.users.idUser, Validators.nullValidator],

            longueur: [this.priseCharge.colis?.longueur, Validators.nullValidator],
            largeur: [this.priseCharge.colis?.largeur, Validators.nullValidator],
            hauteur: [this.priseCharge.colis?.hauteur, Validators.nullValidator],
            nbKilo: [this.priseCharge.colis?.nbKilo, Validators.nullValidator],
            tarif: [this.priseCharge.colis?.tarif, Validators.nullValidator],
            horodatage: [this.priseCharge.colis?.horodatage, Validators.nullValidator],
            description: [this.priseCharge.colis?.description, Validators.nullValidator]

          });

          this.priseStatut = this.priseCharge.statuts?.libelStatut;
          this.colisStatut = this.priseCharge.colis?.statuts.libelStatut;

          console.log('Formulaire recupéré :', this.form.value);

          //Gestion de l'activation des boutons
          if (this.colisStatut === 'CREER') {
            this.isAccepte = true;
            this.isSupprime = true;
          }

          if (this.colisStatut === 'ACCEPTEE' && this.priseStatut === 'ACCEPTEE') {
            this.isAccepte = false;
            this.isAnnule = true;
            this.isPrendCharge = true;
            this.isProbleme = true;
          }

          if (this.colisStatut === 'ANNULE' && this.priseStatut === 'ANNULE') {
            this.isAnnule = false;
            this.isPrendCharge = false;
            this.isProbleme = false;

            this.isSupprime = true;
            this.isRepublie = true;
          }

          if (this.priseStatut === 'PRISE_CHARGE') {
            this.isSupprime = false;
            this.isRepublie = false;

            this.isConfPrendCharge = true;
            this.isAnnulePrise = true;
            this.isProbleme = true;
          }

          if (this.priseStatut === 'CONFIRME_PRISE_CHARGE') {
            this.isDelivre = true;
            this.isProbleme = true;
          }

          if (this.priseStatut === 'ANNUL_PRISE_CHARGE') {
            this.isSupprime = true;
            this.isRepublie = true;
          }

          if (this.colisStatut === 'DELIVRE') {
            this.isDelivre = false;
            this.isConfRecept = true;
            this.isProbleme = true;
          }

          if (this.colisStatut === 'CONFIRME_RECEPTION'||this.priseStatut === 'CONFIRME_RECEPTION') {
            this.isConfRecept = false;
            this.isCloture = true;
            this.isProbleme = true;
          }

          this.updateTranslation(); // Met à jour la traduction initiale

        });

   

    } else {

      this.idPrise = this.route.snapshot.params["idPrise"];
      if (this.idPrise) {
        this.priseChargeService.getById(this.idPrise)
          .subscribe(data => {
            this.priseCharge = data;
  
            this.form = this.fb.group({
  
              idPrise: [this.idPrise, Validators.nullValidator],
              statutPrise: [this.priseCharge.statuts?.libelStatut, Validators.nullValidator],
              userPrise: [this.priseCharge.users?.idUser, Validators.nullValidator],
              idVol: [this.priseCharge.idVol, Validators.nullValidator],
              villeDepart: [this.priseCharge.villeDepart, Validators.nullValidator],
              dateDepart: [this.priseCharge.dateDepart, Validators.nullValidator],
              villeArrivee: [this.priseCharge.villeArrivee, Validators.nullValidator],
              dateArrivee: [this.priseCharge.dateArrivee, Validators.nullValidator],
  
              statutColis: [this.priseCharge.colis?.statuts.libelStatut, Validators.nullValidator],
  
              userColis: [this.priseCharge.colis?.users.idUser, Validators.nullValidator],
  
              longueur: [this.priseCharge.colis?.longueur, Validators.nullValidator],
              largeur: [this.priseCharge.colis?.largeur, Validators.nullValidator],
              hauteur: [this.priseCharge.colis?.hauteur, Validators.nullValidator],
              nbKilo: [this.priseCharge.colis?.nbKilo, Validators.nullValidator],
              tarif: [this.priseCharge.colis?.tarif, Validators.nullValidator],
              horodatage: [this.priseCharge.colis?.horodatage, Validators.nullValidator],
              description: [this.priseCharge.colis?.description, Validators.nullValidator]
  
            });
  
            this.priseStatut = this.priseCharge.statuts?.libelStatut;
            this.colisStatut = this.priseCharge.colis?.statuts.libelStatut;
  
            console.log('Formulaire recupéré :', this.form.value);
  
            //Gestion de l'activation des boutons
            if (this.colisStatut === 'CREER') {
              this.isAccepte = true;
              this.isSupprime = true;
            }
  
            if (this.colisStatut === 'ACCEPTEE' && this.priseStatut === 'ACCEPTEE') {
              this.isAccepte = false;
              this.isAnnule = true;
              this.isPrendCharge = true;
              this.isProbleme = true;
            }
  
            if (this.colisStatut === 'ANNULE' && this.priseStatut === 'ANNULE') {
              this.isAnnule = false;
              this.isPrendCharge = false;
              this.isProbleme = false;
  
              this.isSupprime = true;
              this.isRepublie = true;
            }
  
            if (this.priseStatut === 'PRISE_CHARGE') {
              this.isSupprime = false;
              this.isRepublie = false;
  
              this.isConfPrendCharge = true;
              this.isAnnulePrise = true;
              this.isProbleme = true;
            }
  
            if (this.priseStatut === 'CONFIRME_PRISE_CHARGE') {
              this.isDelivre = true;
              this.isProbleme = true;
            }
  
            if (this.priseStatut === 'ANNUL_PRISE_CHARGE') {
              this.isSupprime = true;
              this.isRepublie = true;
            }
  
            if (this.colisStatut === 'DELIVRE') {
              this.isDelivre = false;
              this.isConfRecept = true;
              this.isProbleme = true;
            }
  
            if (this.colisStatut === 'CONFIRME_RECEPTION'||this.priseStatut === 'CONFIRME_RECEPTION') {
              this.isConfRecept = false;
              this.isCloture = true;
              this.isProbleme = true;
            }
  
            this.updateTranslation(); // Met à jour la traduction initiale
  
          });
  
      }
  

    }
   
  }

  getAlert(bouton: string) {
    alert(bouton);
  }

  prendreEnCharge() {
    if (confirm("Êtes-vous sûr de vouloir prendre en charge ?")) {
      // update du statut de la prise en charge
      // qui passe de 'ACCEPTEE' =>  'PRISE_CHARGE'
      let newStatut: Statuts = new Statuts(4, 'PRISE_CHARGE');
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge enregistrée avec succès', response);
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

  confirmPriseEnCharge() {
    if (confirm("Êtes-vous sûr de confirmer la prise en charge ?")) {
      // update du statut du colis et de la prise en charge
      // qui passent à =>  'CONFIRME_PRISE_CHARGE' 
      let newStatut: Statuts = new Statuts(5, 'CONFIRME_PRISE_CHARGE');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge enregistrée avec succès', response);
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

  delivrer() {
    if (confirm("Êtes-vous sûr de confirmer la livraison?")) {
      // update du statut du colis  à =>  'DELIVRE' 
      let newStatut: Statuts = new Statuts(7, 'DELIVRE');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge enregistrée avec succès', response);
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


  confirmReception() {
    if (confirm("Êtes-vous sûr de confirmer la reception du colis ?")) {
      // update du statut du colis et de la prise en charge
      // qui passent à =>  'CONFIRME_RECEPTION' 
      let newStatut: Statuts = new Statuts(8, 'CONFIRME_RECEPTION');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge enregistrée avec succès', response);
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



  annule() {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNULE'
      let newStatut: Statuts = new Statuts(3, 'ANNULE');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.annule(this.priseCharge.idPrise, this.priseCharge)
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

  annulePrise() {
    if (confirm("Êtes-vous sûr de vouloir annuler la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'ANNUL_PRISE_CHARGE'
      let newStatut: Statuts = new Statuts(6, 'ANNUL_PRISE_CHARGE');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.annule(this.priseCharge.idPrise, this.priseCharge)
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

  supprimer() {
    if (confirm("Êtes-vous sûr de vouloir supprimer la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'SUPPRIME'
      let newStatut: Statuts = new Statuts(10, 'SUPPRIME');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
        .subscribe({
          next: (response) => {
            console.log('Prise en charge supprimé', response);
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

  
  signaler() {
    if (confirm("Vous êtes sur le point de signaler un problème sur la prise en charge.\nVous confirmez ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'PROBLEME'
      let newStatut: Statuts = new Statuts(99, 'PROBLEME');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
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

  
  cloturer() {
    if (confirm("Êtes-vous sûr de vouloir cloturer la prise en charge ?")) {
      // update du statut de la prise en charge
      // qui passe à =>  'CLOTURE'
      let newStatut: Statuts = new Statuts(9, 'CLOTURE');
      if (this.priseCharge.colis)
        this.priseCharge.colis.statuts = newStatut;
      this.priseCharge.statuts = newStatut;
      this.priseChargeService.update(this.priseCharge.idPrise, this.priseCharge)
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

  updateTranslation():void {
    const statutColisValue = this.form.get('statutColis')?.value;
    const statutPriseValue = this.form.get('statutPrise')?.value;

    if (statutColisValue)
    this.translate.get(statutColisValue).subscribe(translatedText => {
      this.translatedStatutColis = translatedText;
    });

  if (statutPriseValue)
    this.translate.get(statutPriseValue).subscribe(translatedText => {
      this.translatedStatutPrise = translatedText;
    });
  }

  
  getBackgroundColor(statuts: string) {
    return this.statutService.getBackgroundColor(statuts);
  }

  getTextColor(statuts: string) {
    return this.statutService.getTextColor(statuts);
  }

  formatDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '' : '';
  }

  goBack() {
    this.location.back();
  }

}

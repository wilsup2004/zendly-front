import { Component } from '@angular/core';
import { DatePipe, Location } from '@angular/common'; // Importation du service Location pour la navigation
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user.model';
import { Colis } from 'src/app/model/colis.model';
import { Statuts } from 'src/app/model/statuts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeroport } from 'src/app/model/aeroport.model';
import { AeroportsService } from 'src/app/services/aeroports.service';
import { ColisService } from 'src/app/services/colis.service';
import { ActivatedRoute } from '@angular/router';

interface ColisSansImage {
  idColis: any,
  statuts:Statuts;
  users:User ;
  longueur: any;
  largeur: any;
  hauteur: any;
  nbKilo: any;
  tarif: any;
  horodatage: Date;
  villeDepart: string;
  villeArrivee: string;
  description: string;
  photopath: string;
}


@Component({
  selector: 'app-colis-details',
  templateUrl: './colis-details.component.html',
  styleUrls: ['./colis-details.component.scss']
})

export class ColisDetailsComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  user?: User | null;
  submitted = false;
  form: FormGroup;

  selectedOriginValue: Aeroport= {};
  selectedDestinationValue: Aeroport= {};
  
  origin: string = '';
  destination: string = '';

  photoinit: string | ArrayBuffer | null = null;

  origins: Aeroport[] = [];
  destinations: Aeroport[] = [];
  
  idColis:any;
  colisSansImage ?: ColisSansImage | null;

  colis: Colis={
    idColis: '',
    statuts: new Statuts('',''),
    users: new User('','','','','',[]),
    longueur: '',
    largeur:  '',
    hauteur: '',
    nbKilo: '',
    tarif: '',
    horodatage: new Date,
    villeDepart:  '',
    villeArrivee:  '',
    description:  '',
    photoPath:  '',
    file : new File([],'')
   };

  constructor(
    private authService: AuthService,
    private location: Location,
    private colisService : ColisService,
    private route: ActivatedRoute,
    private aeroportService: AeroportsService,
    private fb: FormBuilder,
    private datePipe: DatePipe) { 

      this.authService.user.subscribe((user) => {
        this.user = user;
    });

    this.form = this.fb.group({
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      hauteur: ['', Validators.required],
      nbKilo: ['', Validators.required],
      tarif: ['', Validators.nullValidator],
      horodatage: ['', Validators.nullValidator],
      villeDepart: ['', Validators.required],
      villeArrivee: ['', Validators.required],
      description: ['', Validators.required]

    });

    
  }

  ngOnInit(): void {
    
  this.idColis = this.route.snapshot.params["idColis"];
  if(this.idColis) {

    this.colisService.getById(this.idColis)
    .subscribe(data =>{
      this.colisSansImage = data;

      this.colis = data;
      console.log('colis recupéré :', this.colis);      
      console.log('photopath:', this.colis.photoPath);
      this.photoinit = this.colis.photoPath;
      
      
      console.log('photoinit:', this.photoinit);

      this.form = this.fb.group({
      longueur: [this.colisSansImage?.longueur, Validators.required],
      largeur: [this.colisSansImage?.largeur, Validators.required],
      hauteur: [this.colisSansImage?.hauteur, Validators.required],
      nbKilo: [this.colisSansImage?.nbKilo, Validators.required],
      tarif: [this.colisSansImage?.tarif, Validators.nullValidator],
      horodatage: [this.colisSansImage?.horodatage, Validators.nullValidator],
      villeDepart: [this.colisSansImage?.villeDepart, Validators.required],
      villeArrivee: [this.colisSansImage?.villeArrivee, Validators.required],
      description: [this.colisSansImage?.description, Validators.required]

    });

    console.log('Formulaire recupéré :', this.form.value);
    this.imagePreview = this.colisService.getImage(this.idColis);

    } );

  }
  
  this.retrieveAeroports();
    
  }



  retrieveAeroports(): void {
    let params: any = {};
    this.aeroportService.getAll(params)
    .subscribe(
      response => {
        //const { aeroports} = response;
        this.origins = response;
        this.destinations = response;
        console.log(this.origins);
      },
      error => {
        console.log(error);
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) {
      //this.colis.file.append('file', this.selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Formulaire soumis :', this.form.value);
    }
  }

  saveColis(): void {
    this.submitted = true;
   // console.log('Formulaire soumis :', this.form.value);
   // console.log('photo soumise :',this.selectedFile);
    let  colisValid :Colis = this.form.value;

    if (this.selectedFile && !(this.selectedFile.name=== 'no_photo.jpeg')) {
      this.colis.file = this.selectedFile;
    }


    if(this.colis.users.idUser==='' && this.user)
      this.colis.users = this.user;
      
    if(this.colis.statuts.idStatut === '')
      this.colis.statuts = new Statuts(1,"CREER")
    
    this.colis.horodatage = new Date();

    this.colis.longueur = colisValid.longueur;
    this.colis.largeur = colisValid.largeur;
    this.colis.hauteur = colisValid.hauteur;
    this.colis.nbKilo = colisValid.nbKilo;
    this.colis.tarif = colisValid.tarif;
    this.colis.villeDepart = colisValid.villeDepart;
    this.colis.villeArrivee = colisValid.villeArrivee;
    this.colis.description = colisValid.description;
   

  
  this.colisService.create(this.colis)
  .subscribe({
    next: (response) => {
      console.log('Colis enregistré avec succès', response);
    },
    error: (e) =>{ 
      console.error('Erreur lors de l\'enregistrement', e);
   }
  });

   
  }



  updateColis(): void {
    this.submitted = true;
    console.log('Formulaire soumis :', this.form.value);
    console.log('photo soumise :',this.selectedFile);
    let  colisValid :Colis = this.form.value;

    this.colis.idColis = this.idColis;

    if (this.selectedFile && !(this.selectedFile.name=== 'no_photo.jpeg')) {
      this.colis.file = this.selectedFile;
    }

    this.colis.longueur = colisValid.longueur;
    this.colis.largeur = colisValid.largeur;
    this.colis.hauteur = colisValid.hauteur;
    this.colis.nbKilo = colisValid.nbKilo;
    this.colis.tarif = colisValid.tarif;
    this.colis.villeDepart = colisValid.villeDepart;
    this.colis.villeArrivee = colisValid.villeArrivee;
    this.colis.description = colisValid.description;
   

  
  this.colisService.update(this.colis)
  .subscribe({
    next: (response) => {
      console.log('Colis enregistré avec succès', response);
      alert('Colis enregistré avec succès !');
    },
    error: (e) =>{ console.error('Erreur lors de l\'enregistrement', e);
    alert('Erreur lors de l\'enregistrement du colis.'); }
  });

   
  }

  newColis(): void {

    this.submitted = false;
    this.colis ={
      idColis: '',
      statuts: new Statuts('',''),
      users: new User('','','','','',[]),
           longueur: '',
           largeur:  '',
           hauteur: '',
           nbKilo: '',
           tarif: '',
           horodatage: new Date,
           villeDepart:  '',
           villeArrivee:  '',
           description:  '',
           photoPath:  '',
           file : new File([],'')
     };

     this.form = this.fb.group({
      longueur: ['', Validators.required],
      largeur: ['', Validators.required],
      hauteur: ['', Validators.required],
      nbKilo: ['', Validators.required],
      tarif: ['', Validators.nullValidator],
      horodatage: ['', Validators.nullValidator],
      villeDepart: ['', Validators.required],
      villeArrivee: ['', Validators.required],
      description: ['', Validators.required]

    });
    this.imagePreview ='';
    this.photoinit = '';
  }

  supprimePhoto() {
    this.selectedFile = null;
    this.imagePreview ='';
  }

  formatDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '' : '';
  }
  
  goBack() {
    this.location.back();
  }

}

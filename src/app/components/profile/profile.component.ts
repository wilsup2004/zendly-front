import { Component, OnInit,Input  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
import { UsersService} from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usersprofils } from '../../model/usersprofils.model';
import { Iduserprofil } from '../../model/iduserprofil.model';
import { Profil } from '../../model/profil.model';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user?: User | null;
  idUser: any;
  nom : string ='';
  prenom: string ='';
  mail: string ='';
  profile : string ='';
  visible : boolean = false;
  form: FormGroup;

  
  @Input() currentUser: User = {
    idUser: '',
    nom: '',
    prenom: '',
    mail: '',
    password: '',
    usersProfils: []
  };
  
  @Input() currentProfil: Profil = {
    idProfil: '',
    libelProfil: ''
  };

  
  message = '';

  constructor(public authService: AuthService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
  
      this.form = this.fb.group({
        idUser: ['', Validators.required],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        mail: ['', Validators.required],
        password: ['', Validators.required],
        usersProfils: [[], Validators.required]
  
      });
  
    this.authService.user.subscribe((user) => {
    this.user = user;
    if(this.user) {
      this.idUser = this.user.idUser;
      this.nom  =this.user.nom;
      this.prenom  = this.user.prenom;
      this.mail  = this.user.mail;
      this.profile  = this.user.usersProfils[0].profil.libelProfil;

      this.form = this.fb.group({
        idUser: [this.idUser, Validators.required],
        nom: [this.nom, Validators.required],
        prenom: [this.prenom , Validators.required],
        mail: [this.mail, Validators.required],
        password: [this.user.password, Validators.required],
        usersProfils: [this.user.usersProfils, Validators.nullValidator]
  
      });

      this.visible = true;
      
    this.userService.get(this.idUser)
    .subscribe({
      next: (data) => {
        this.currentUser = data;
       // console.log(this.currentUser);
        if(data.usersProfils) {
          this.currentProfil.idProfil = data.usersProfils[0].profil.idProfil; 
          this.currentProfil.libelProfil = data.usersProfils[0].profil.libelProfil ; 
        }
                
       // console.log(data);
      },
      error: (e) => console.error(e)
    });
    }
  });
  }


  updateUser(): void {
    this.message = '';
    this.currentUser = this.form.value;
    if(this.currentProfil.idProfil) {
      if(!this.currentUser.usersProfils||this.currentUser.usersProfils.length==0){
        this.currentUser.usersProfils = [new Usersprofils(
          new Iduserprofil(this.currentUser.idUser,this.currentProfil.idProfil),
          new Profil(this.currentProfil.idProfil,this.currentProfil.libelProfil),
          '','')];
      }
    }
    this.userService.update(this.currentUser.idUser, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Ce user a été modifié avec succès!';
        },
        error: (e) => console.error(e)
      });
  }

  saveUser(): void {
    this.currentUser = this.form.value;
    const data = {
      idUser : this.currentUser.idUser,
      nom: this.currentUser.nom,
      prenom: this.currentUser.prenom,
      mail: this.currentUser.mail,
      password: this.currentUser.password,
      usersProfils:[
        new Usersprofils(
          new Iduserprofil(this.currentUser.idUser,3),
          new Profil(3,"USER"),
        new Date,'')]
    };

    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

}

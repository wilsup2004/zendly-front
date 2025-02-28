import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Usersprofils } from 'src/app/model/usersprofils.model';
import { Iduserprofil } from 'src/app/model/iduserprofil.model';
import { Profil } from 'src/app/model/profil.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  profil: Profil = {
    idProfil: '',
    libelProfil: ''
  };
 
   user: User = {
     idUser: '',
     nom: '',
     prenom: '',
     mail: '',
     password: '',
     usersProfils: []
   };
 
   submitted = false;
 
   constructor(private userService: UsersService) { }
 
   ngOnInit(): void {
   }
 
   saveUser(): void {
     const data = {
       idUser : this.user.idUser,
       nom: this.user.nom,
       prenom: this.user.prenom,
       mail: this.user.mail,
       password: this.user.password,
       usersProfils:[new Usersprofils(
         new Iduserprofil(this.user.idUser,this.profil.idProfil),
         new Profil(this.profil.idProfil,this.profil.libelProfil),
         new Date,'')]
     };
 
     this.userService.create(data)
       .subscribe({
         next: (res) => {
           console.log(res);
           this.submitted = true;
         },
         error: (e) => console.error(e)
       });
   }
 
   newUser(): void {
     this.submitted = false;
     this.user = {
       idUser:'',
       nom: '',
       prenom: '',
       mail: '',
       password: '',
       usersProfils: []
     };
   }
 
 }
 
import { Component, OnInit,Input } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UsersService} from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usersprofils } from '../../model/usersprofils.model';
import { Iduserprofil } from '../../model/iduserprofil.model';
import { Profil } from '../../model/profil.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent  implements OnInit {

  @Input() viewMode = false;

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

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["idUser"]);
    }
  }

  getUser(idUser: string): void {
    this.userService.get(idUser)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          if(data.usersProfils) {
            this.currentProfil.idProfil = data.usersProfils[0].profil.idProfil; 
            this.currentProfil.libelProfil = data.usersProfils[0].profil.libelProfil ; 
          }
                  
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

 
  updateUser(): void {
    this.message = '';
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

  deleteUser(): void {
    this.userService.delete(this.currentUser.idUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

}



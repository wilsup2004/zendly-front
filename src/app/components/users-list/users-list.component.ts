import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Profil } from '../../model/profil.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  


  users: User[] = [];
  currentUser: User = {
    idUser: '',
    nom: '',
    prenom: '',
    mail: '',
    password: '',
    usersProfils: []
  };
  currentProfil: Profil = new Profil('','');
  currentIndex = -1;
  nom = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  user?: User | null;

  constructor(private userService: UsersService,public authService: AuthService) { 

   
  }


  ngOnInit(): void {
    this.retrieveUsers();
  }
 

  getRequestParams(searchNom: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchNom) {
      params[`nom`] = searchNom;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveUsers(): void {
    const params = this.getRequestParams(this.nom, this.page, this.pageSize);

    this.userService.getAll(params)
    .subscribe(
      response => {
        const { users, totalItems } = response;
        this.users = users;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {
      idUser: '',
      nom: '',
      prenom: '',
      mail: '',
      password: '',
      usersProfils: []
    };
    this.currentProfil= new Profil('','');
    this.currentIndex = -1;
  }

  setActiveUser(tutorial: User, index: number): void {
    this.currentUser = tutorial;
    if(tutorial.usersProfils)
      this.currentProfil = tutorial.usersProfils[0].profil;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNom(): void {
    this.currentUser = {
      idUser: '',
      nom: '',
      prenom: '',
      mail: '',
      password: '',
      usersProfils: []
    };
    this.currentIndex = -1;

    this.userService.findByNom(this.nom)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}

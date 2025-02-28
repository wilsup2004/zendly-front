import { Component, OnInit} from '@angular/core';
import { UsersDispo } from '../../model/users-dispo';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { User } from '../../model/user.model';
import { Statuts } from '../../model/statuts';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent  implements OnInit  {
  user?: User | null;
  transactions: UsersDispo[] = [];
  currentTransaction: UsersDispo = {
    idDispo: '',
    idVol: '',
    villeDepart: '',
    aeronomDepart: '',
    dateDepart: new Date(),
    villeArrivee: '',
    aeronomArrivee: '',
    dateArrivee: new Date(),
    nbKiloDispo: '',
    users: new User ('','','','','',[]),
    statuts: new Statuts('','')
  };
  currentIndex = -1;
  userNom = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(private transactionService: TransactionService,
    public authService: AuthService,
    private location: Location) { 
    this.authService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.currentTransaction= {
      idDispo: '',
      idVol: '',
      villeDepart: '',
      aeronomDepart: '',
      dateDepart: new Date(),
      villeArrivee: '',
      aeronomArrivee: '',
      dateArrivee: new Date(),
      nbKiloDispo: '',
      users: new User ('','','','','',[]),
      statuts: new Statuts('','')
    };
    this.currentIndex = -1;
    this.retrieveTransaction();
  }

  isProfileVisible(profile: string): boolean {
    return this.authService.getCurrentUserProfile() === profile;
  }
  getRequestParams(searchNom: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchNom) {
      params[`userNom`] = searchNom;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveTransaction(): void {
    const params = this.getRequestParams(this.userNom, this.page, this.pageSize);
    this.searchNom();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTransaction();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTransaction();
  }

  refreshList(): void {
    this.retrieveTransaction();
    this.currentTransaction  = {
      idDispo: '',
      idVol: '',
      villeDepart: '',
      aeronomDepart: '',
      dateDepart: new Date(),
      villeArrivee: '',
      aeronomArrivee: '',
      dateArrivee: new Date(),
      nbKiloDispo: '',
      users: new User ('','','','','',[]),
      statuts: new Statuts('','')
    };
    this.currentIndex = -1;
  }

  setActiveTransaction(transaction: UsersDispo, index: number): void {
    this.currentTransaction = transaction;
    this.currentIndex = index;
  }

  removeAllTransactions(): void {
    this.transactionService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNom(): void {
    this.currentTransaction  = {
      idDispo: '',
      idVol: '',
      villeDepart: '',
      aeronomDepart: '',
      dateDepart: new Date(),
      villeArrivee: '',
      aeronomArrivee: '',
      dateArrivee: new Date(),
      nbKiloDispo: '',
      users: new User ('','','','','',[]),
      statuts: new Statuts('','')
    };
    this.currentIndex = -1;

    this.transactionService.findByNom(this.user?.idUser)
      .subscribe({
        next: (data) => {
          this.transactions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  goBack() {
    this.location.back();
  }

}


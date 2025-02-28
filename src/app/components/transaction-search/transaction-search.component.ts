import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PropositionInitial } from 'src/app/model/proposition-initial.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transaction-search',
  templateUrl: './transaction-search.component.html',
  styleUrls: ['./transaction-search.component.scss']
})
export class TransactionSearchComponent  implements OnInit {

  propositions:PropositionInitial[]=[];
  displayedColumns: string[] = ['idDispo', 
  'idUserInitiateur', 
  'idVol', 
  'villeDepart',
  'dateDepart',
  'villeArrivee',
  'dateArrivee',
  'nbKiloAchete',
  'libelStatut',
  'details'
  ];
  dataSource = new MatTableDataSource<PropositionInitial>();

  @ViewChild('paginator') paginator !: MatPaginator;
  idCurrentUser: any;
  
  message = '';

  constructor(
    public authService: AuthService,
    private transactionService: TransactionService) { 
      this.authService.user.subscribe((user) => {
        if(user) {
          this.idCurrentUser = user.idUser;
      }
    });

    }

    ngOnInit(): void {
   
        this.message = '';
        this.getAllTransaction();
   
    }

  getAllTransaction(): void {

    if (this.idCurrentUser) {

      this.transactionService.getAllHorsCandidat(this.idCurrentUser).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) =>  console.error(e)
      });
    }
  }
}

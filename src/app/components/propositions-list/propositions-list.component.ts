import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import { UsersDispo } from '../../model/users-dispo';
import { User } from '../../model/user.model';
import { Statuts } from '../../model/statuts';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Proposition } from '../../model/proposition.model';
import { MatTableDataSource } from '@angular/material/table';
import { PropositionService } from '../../services/proposition.service';
import { MatPaginator } from '@angular/material/paginator';
import { StatutsService } from '../../services/statuts.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-propositions-list',
  templateUrl: './propositions-list.component.html',
  styleUrls: ['./propositions-list.component.scss']
})
export class PropositionsListComponent implements OnInit  {

  user?: User | null;
  propositions:Proposition[]=[];

  displayedColumns: string[] = 
  ['idDispo', 
  'idUserInitiateur', 
  'idVol', 
  'idUserCandidat',
  'nbKiloAchete',
  'libelStatut',
  'details',
  'message'
];

  dataSource :any;

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  constructor( public authService: AuthService,
    private propositionService: PropositionService,
    private location: Location) { 
      this.authService.user.subscribe((user) => {
        this.user = user;
      
    });
  }

  ngOnInit(): void {
     this.getAllPropositions();
  }

  getAllPropositions(): void {
    if (this.user) {
      this.propositionService.findByCandidat(this.user.idUser)
      .subscribe({
        next: (data) => {
          this.propositions = data;
          console.log(this.propositions);
          this.dataSource = new MatTableDataSource<Proposition>(this.propositions);
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => console.error(e)
      });

    }

  }

  goBack() {
    this.location.back();
  }
  
}

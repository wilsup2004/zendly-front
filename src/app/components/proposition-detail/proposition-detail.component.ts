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
import { UserTrade } from 'src/app/model/user-trade.model';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-proposition-detail',
  templateUrl: './proposition-detail.component.html',
  styleUrls: ['./proposition-detail.component.scss']
})
export class PropositionDetailComponent implements OnInit  {

  idDispo: any;
  idCurrentUser: any;
  proposition: Proposition = new Proposition;

 @Input() currentProposition: UserTrade = {
    idDispo: '',
    idUserCandidat: '',
    nbKiloAchete: ''
  };

  @Input() currentTransaction: UsersDispo = {
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
  
  listPropositionsAccepted: Proposition[] =[];
  nbKiloRestant=0;
  message = '';

  constructor(
    public authService: AuthService,
    private transactionService: TransactionService,
    private propositionService: PropositionService,
    private statutService: StatutsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

      this.authService.user.subscribe((user) => {
        if(user) {
          this.idCurrentUser = user.idUser;
      }
    });
  }

    ngOnInit(): void {
        this.nbKiloRestant=0;
        this.message = '';
        this.idDispo = this.route.snapshot.params["idDispo"];
        this.getTransaction(this.idDispo );
        
    }

    getTransaction(idDispo: any): void {
      this.transactionService.get(idDispo)
        .subscribe({
          next: (data) => {
            this.currentTransaction = data;
            console.log(data);
            if(this.currentTransaction){
              this.getPropositions();
              this.calculNbKilorestant();
  /*          
              this.nbKiloRestant = this.propositionService.calculNbKilorestant(
                this.currentTransaction.idDispo,
                this.idCurrentUser,
                this.currentTransaction.nbKiloDispo
              );
*/
              console.log("Nb kilo rest calcule ="+this.nbKiloRestant);

            }
          },
          error: (e) => console.error(e)
        });
    }
  
  
    getPropositions(): void {
      this.propositionService.findByCandidatAndId(this.idCurrentUser,this.currentTransaction.idDispo)
        .subscribe({
          next: (data) => {
            this.proposition = data;
            console.log(this.proposition);

            if(this.proposition) {
                this.currentProposition.idDispo = this.proposition.idDispo;
                this.currentProposition.nbKiloAchete = this.proposition.nbKiloAchete;
                this.currentProposition.idUserCandidat = this.idCurrentUser;
            }
           
          },
          error: (e) => console.error(e)
        });
  
    }

 create (): void {
  if(this.currentProposition.nbKiloAchete) {

    this.currentProposition.idDispo = this.currentTransaction.idDispo;
    this.currentProposition.idUserCandidat = this.idCurrentUser;

    this.propositionService.create(this.currentProposition)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'Proposition soumise avec succès!';
      },
      error: (e) => console.error(e)
    });
  }
 }

 updateProposition(): void {
  this.message = '';

  //MAJ de la proposition
  this.proposition.nbKiloAchete = this.currentProposition.nbKiloAchete ;
  this.propositionService.update(this.currentTransaction.idDispo, this.proposition)
    .subscribe({
      next: (res) => {
        console.log(res);
        location.reload();
        this.message = res.message ? res.message : 'Proposition modifiée avec succès!';
      },
      error: (e) => console.error(e)
    });

    
}


calculNbKilorestant():void{
  this.nbKiloRestant = this.currentTransaction.nbKiloDispo;
  this.propositionService.getAccept(this.currentTransaction.idDispo)
  .subscribe({
    next: (res) => {
      this.listPropositionsAccepted = res;
      console.log(this.listPropositionsAccepted);
      for(let propos of this.listPropositionsAccepted ){
        
        this.nbKiloRestant = this.nbKiloRestant - propos.nbKiloAchete;
      }
     
    },
    error: (e) => console.error(e)
  });

}

goBack() {
  this.location.back();
}

}

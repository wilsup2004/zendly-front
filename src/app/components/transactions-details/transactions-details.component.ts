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
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.scss']
})

export class TransactionsDetailsComponent implements OnInit {
  listPropositionsAccepted: Proposition[] =[];
  optionStatuts:Statuts[]=[];
  propositions:Proposition[]=[];
  propositionsModifies:Proposition[]=[];
  currentStatut:Statuts={
    idStatut: '',
    libelStatut: ''
  };

  displayedColumns: string[] = ['idDispo', 'idUserInitiateur', 'idVol', 'idUserCandidat','nbKiloAchete','libelStatut','message'];
  dataSource :any;

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  @Input() viewMode = false;

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
  
  nbKiloRestant=0;
  message = '';

  
  constructor(
    private transactionService: TransactionService,
    private propositionService: PropositionService,
    private statutService: StatutsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTransaction(this.route.snapshot.params["idDispo"]);
      this.getPropositions(this.route.snapshot.params["idDispo"]);
      this.getListStatutForProposition();
    }
  }


  getTransaction(idDispo: string): void {
    this.transactionService.get(idDispo)
      .subscribe({
        next: (data) => {
          this.currentTransaction = data;
          console.log(data);
          this.calculNbKilorestant();
        },
        error: (e) => console.error(e)
      });
  }


  getPropositions(idDispo: string): void {
    this.propositionService.get(idDispo)
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

  getListStatutForProposition(): void {
    this.statutService.getAllForProposition()
      .subscribe({
        next: (data) => {
          this.optionStatuts = data;
         //console.log(data);
        },
        error: (e) => console.error(e)
      });

  }


  updateTransaction(): void {
    this.message = '';

    this.transactionService.update(this.currentTransaction.idDispo, this.currentTransaction)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Transaction modifiée avec succès!';
        },
        error: (e) => console.error(e)
      });
  }


  updateProposition(proposition:Proposition): void {
    this.message = '';

    this.propositionService.update(this.currentTransaction.idDispo, proposition)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Proposition modifiée avec succès!';
        },
        error: (e) => console.error(e)
      });
      
      //location.reload();
  }


  setCurrentStatuts(idStatut:any){
    for(let i=0;i<this.optionStatuts.length;i++){
      let statut = this.optionStatuts[i];
      if(statut.idStatut==idStatut)
        this.currentStatut = statut;
    }
    console.log(this.currentStatut);
  }

  /*
  onStatutChange(proposition:Proposition){
    this.nbKiloRestant = this.currentTransaction.nbKiloDispo;
  
    //On ne peut pas revenir à l'état initial
    if(this.currentStatut.libelStatut!='PROPOSEE'){

    //  let nbKiloDispo = this.currentTransaction.nbKiloDispo
      if(proposition.libelStatut=='ACCEPTEE'&&this.currentStatut.libelStatut!='REALISEE')
         // on doit remettre les kilos accepté auparavant
         this.nbKiloRestant = this.nbKiloRestant + proposition.nbKiloAchete;
      else if (this.currentStatut.libelStatut=='ACCEPTEE')
        this.nbKiloRestant = this.nbKiloRestant + proposition.nbKiloAchete;

      proposition.idStatut = this.currentStatut.idStatut;
      proposition.libelStatut = this.currentStatut.libelStatut;
      if (!this.propositionsModifies.includes(proposition)) {
        this.propositionsModifies.push(proposition);
      }

      this.currentTransaction.nbKiloDispo = nbKiloDispo;
      if(this.currentTransaction.statuts.libelStatut=='CREE'){
        this.currentTransaction.statuts.idStatut='2';
        this.currentTransaction.statuts.libelStatut='EN COURS';
      }
    }
  }

  */
  onStatutChange(proposition:Proposition){
    
    //On ne peut pas revenir à l'état initial
    if(this.currentStatut.libelStatut!='PROPOSEE'){
      proposition.idStatut = this.currentStatut.idStatut;
      proposition.libelStatut = this.currentStatut.libelStatut;
      if (!this.propositionsModifies.includes(proposition)) {
        this.propositionsModifies.push(proposition);
      }

      if(this.currentTransaction.statuts.libelStatut=='CREE'){
        this.currentTransaction.statuts.idStatut='2';
        this.currentTransaction.statuts.libelStatut='EN COURS';
      }
    }
  }

  saveLstPropositions():void{
    console.log(this.propositionsModifies);

    //On recalcul le nombre de kilo dispo
   // let nbKiloDispo = this.currentTransaction.nbKiloDispo
    for(let  proposition of this.propositionsModifies ){
      this.updateProposition(proposition);
    }

    //On fait une MAJ du nombre de kilos de la transaction en base
    //this.updateTransaction() ;

    //Reinitialisations de la liste
    this.propositionsModifies=[];
    location.reload();
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

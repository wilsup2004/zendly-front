import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';


import { AeroportListComponent } from './components/aeroport-list/aeroport-list.component';
import { AeroportDetailsComponent } from './components/aeroport-details/aeroport-details.component';
import { AddAeroportComponent } from './components/add-aeroport/add-aeroport.component';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';

import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';


import { DashboardComponent } from './components//dashboard/dashboard.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsDetailsComponent } from './components/transactions-details/transactions-details.component';
import { PropositionsListComponent } from './components/propositions-list/propositions-list.component';
import { TransactionSearchComponent } from './components/transaction-search/transaction-search.component';

import { MessageComponent } from './components/message/message.component';
import { CurrentTransactionsComponent } from './components/current-transactions/current-transactions.component';
import { ColisListComponent } from './components/colis-list/colis-list.component';
import { ColisDetailsComponent } from './components/colis-details/colis-details.component';

import { PriseChargeListComponent } from './components/prise-charge-list/prise-charge-list.component';
import { PriseChargeDetailsComponent } from './components/prise-charge-details/prise-charge-details.component';
import { PriseChargeSearchComponent } from './components/prise-charge-search/prise-charge-search.component';



const routes: Routes = [ { path: 'connexion', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

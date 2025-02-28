import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FinancesComponent } from './components/finances/finances.component';
import { TransactionSearchComponent } from './components/transaction-search/transaction-search.component';
import { PropositionDetailComponent } from './components/proposition-detail/proposition-detail.component';

import { AddAeroportComponent } from './components/add-aeroport/add-aeroport.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AeroportDetailsComponent } from './components/aeroport-details/aeroport-details.component';
import { AeroportListComponent } from './components/aeroport-list/aeroport-list.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionsDetailsComponent } from './components/transactions-details/transactions-details.component';
import { PropositionsListComponent } from './components/propositions-list/propositions-list.component';
import { NgFor } from '@angular/common';
import { MessageComponent } from './components/message/message.component';
import { CurrentTransactionsComponent } from './components/current-transactions/current-transactions.component';
import { ColisListComponent } from './components/colis-list/colis-list.component';
import { ColisDetailsComponent } from './components/colis-details/colis-details.component';

import { PriseChargeListComponent } from './components/prise-charge-list/prise-charge-list.component';
import { PriseChargeDetailsComponent } from './components/prise-charge-details/prise-charge-details.component';
import { PriseChargeSearchComponent } from './components/prise-charge-search/prise-charge-search.component';

import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'finances', component: FinancesComponent },

  { path: 'users', component: UsersListComponent },
  { path: 'users/:idUser', component: UserDetailsComponent },
  { path: 'addUser', component: AddUserComponent },

  { path: 'aeroports', component: AeroportListComponent },
  { path: 'aeroports/:idAero', component: AeroportDetailsComponent },
  { path: 'addAeroport', component: AddAeroportComponent },

  { path: 'flight-search', component: FlightSearchComponent },
  { path: 'flight-details', component: FlightDetailsComponent },

  { path: 'transactions/:idDispo', component: TransactionsDetailsComponent },
  { path: 'transactions-list', component: TransactionsListComponent },
  { path: 'transactions-details', component: TransactionsDetailsComponent },

  { path: 'propositionDetail/:idDispo', component: PropositionDetailComponent },
  { path: 'propositionDetail', component: PropositionDetailComponent },
  { path: 'propositions-list', component: PropositionsListComponent },
  
  { path: 'messages/:idPrise/:idUserColis', component: MessageComponent },
  { path: 'transaction-search', component: TransactionSearchComponent },

  { path: 'current-transactions', component: CurrentTransactionsComponent },

  { path: 'colis-list', component: ColisListComponent },  
  { path: 'colis-list/:idUser', component: ColisListComponent },
  { path: 'colis-details', component: ColisDetailsComponent },
  { path: 'colis/:idColis', component: ColisDetailsComponent },

  { path: 'prise-charge-list', component: PriseChargeListComponent },
  { path: 'prise-charge-list/:idUser', component: PriseChargeListComponent },
  { path: 'prise-charge-details', component: PriseChargeDetailsComponent },
  { path: 'prise-charge/:idPrise', component: PriseChargeDetailsComponent },
  { path: 'prise-charge/colis/:idColis', component: PriseChargeDetailsComponent },
  { path: 'prise-charge-search', component: PriseChargeSearchComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    StatisticsComponent,
    FinancesComponent,
    TransactionSearchComponent,
    PropositionDetailComponent,
    AddAeroportComponent,
    AddUserComponent,
    AeroportDetailsComponent,
    AeroportListComponent,
    FlightDetailsComponent,
    FlightSearchComponent,
    UserDetailsComponent,
    UsersListComponent,
    TransactionsListComponent,
    TransactionsDetailsComponent,
    PropositionsListComponent,
    MessageComponent,
    CurrentTransactionsComponent,
    ColisListComponent,
    ColisDetailsComponent,
    PriseChargeListComponent,
    PriseChargeDetailsComponent,
    PriseChargeSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSortModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    NgFor, 

    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [FlightSearchComponent],
  providers: [
    AuthGuard,
    AuthService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

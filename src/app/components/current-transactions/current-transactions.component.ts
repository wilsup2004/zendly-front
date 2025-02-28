import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common'; // Importation du service Location pour la navigation

@Component({
  selector: 'app-current-transactions',
  templateUrl: './current-transactions.component.html',
  styleUrls: ['./current-transactions.component.scss']
})
export class CurrentTransactionsComponent {

  user?: User | null;

  constructor(private authService: AuthService,
    private router: Router,
    private location: Location) { 
     
      this.authService.user.subscribe((user) => {
        this.user = user;
      
    });

  }


   // Fonction appelée lors du clic sur un bouton
   onButtonClick(redirection: string) {
    this.router.navigateByUrl(`${redirection}`);
  }

  goBack() {
    this.location.back();
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user?: User | null;

  constructor(private authService: AuthService,
    private router: Router) { 
     
      this.authService.user.subscribe((user) => {
        this.user = user;
      
    });

  }


   // Fonction appelée lors du clic sur un bouton
   onButtonClick(redirection: string) {
    this.router.navigateByUrl(`${redirection}`);
  }

}

import { Component, OnInit ,ChangeDetectionStrategy,signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute  } from  '@angular/router';
import { AuthService } from  '../../services/auth.service';
import { first } from 'rxjs/operators';

//import { TranslateService } from '@ngx-translate/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  error?: string;
  loading = false;
  user?: User | null;
  hide = signal(true);
  isPasswordVisible = false;
  
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        mail: ['', Validators.required],
        password: ['', Validators.required]
    });

  }

 
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

    ngOnInit(){
      this.loginForm = this.formBuilder.group({
        mail: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get formControls() { return this.loginForm.controls; }


  seConnecter(){
    this.isSubmitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    } 

    this.loading = true;
    
    
    this.authService.seConnecter(this.loginForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
             // url de redirection en fonction du profil
             this.router.navigateByUrl('dashboard');
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
      
}

togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}

}

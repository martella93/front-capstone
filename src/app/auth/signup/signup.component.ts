import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signup = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private authSrv: AuthService) { }

  signupUser() {
    this.authSrv.signup(this.signup).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log('Errore di autenticazione',err);
      }
    );
  }
}

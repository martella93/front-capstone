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

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const passwordIcon = document.getElementById('togglePassword') as HTMLElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordIcon.classList.remove('bi-eye-slash');
      passwordIcon.classList.add('bi-eye');
    } else {
      passwordField.type = 'password';
      passwordIcon.classList.remove('bi-eye');
      passwordIcon.classList.add('bi-eye-slash');
    }
  }

}

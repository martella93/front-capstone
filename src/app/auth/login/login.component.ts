import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  log = {
    username: '',
    password: ''
  };
  errorMessage: string | undefined;
  rememberMe = false;

  constructor(private authSrv: AuthService, private router: Router) { }

  login(): void {
    this.authSrv.login(this.log).subscribe(
      (response) => {
        if (response.accessToken) {
          this.authSrv.setToken(response.accessToken);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Errore di autenticazione:', error);
        if (error.status) {
          this.errorMessage = 'Username o password non validi.';
        }
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

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
        
      }
    );
  }

}

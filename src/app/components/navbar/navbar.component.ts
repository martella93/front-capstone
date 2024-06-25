import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  preferiti: number[] = [];
  loggedUser: any;

  constructor(
    private authSrv: AuthService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  isDropdownVisible = false;
  ngOnInit(): void {}
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.isDropdownVisible = false;
    }
  }

  isLoggedIn(): boolean {
    return this.authSrv.getToken() !== null;
  }

  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  getLoggedUser(): void {
    this.dataService.getUserLogged().subscribe(
      (user: any) => {
        this.loggedUser = user;
        console.log('Dati utente loggato:', user);
      },
      (error) => {
        console.error("Errore durante il recupero dell'utente loggato:", error);
      }
    );
  }
}

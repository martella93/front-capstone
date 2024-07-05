import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  preferiti: number[] = [];
 

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {}

  isDropdownVisible = false;
  ngOnInit(): void {
    
  }
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

  get userRole(): string | null {
    const role = this.authSrv.getUserRole();
    return role;
  }
  
}

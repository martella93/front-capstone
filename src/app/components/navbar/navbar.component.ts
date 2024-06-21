import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchTerm: any;
  filteredEsperienze: any[] = [];
  esperienze: any[] = [];
  preferiti: number[] = [];
 
  

  constructor(private authSrv: AuthService, private dataService: DataServiceService ,private router: Router) { }

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

  onSearchInput(): void {
    
    if (this.searchTerm.trim() === '') {
      this.filteredEsperienze = this.esperienze;
    }
  }

 cercaPerLuogo(): void {
  if (this.searchTerm.trim() !== '') {
    this.dataService.cercaPerLuogo(this.searchTerm).subscribe(
      data => {
        console.log('Dati ricevuti:', data); // Verifica i dati ricevuti dal backend
        this.filteredEsperienze = data; // Assegniamo i risultati filtrati a filteredEsperienze
      },
      error => {
        console.error('Errore nella ricerca per luogo', error);
      }
    );
  } else {
    // Gestione caso di ricerca vuota o non valida
    this.filteredEsperienze = this.esperienze; // Se il termine di ricerca è vuoto, mostrare tutte le esperienze
  }
}

}

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  searchTerm: any;
  filteredEsperienze: any[] = [];
  esperienze: any[] = [];

 
  constructor(
    private authSrv: AuthService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaEsperienze();
  }
  focusSearchBar() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.focus();
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
        (data) => {
          this.filteredEsperienze = data; 
        },
        (error) => {
          console.error('Errore nella ricerca per luogo', error);
        }
      );
    } else {
      this.filteredEsperienze = this.esperienze; 
    }
  }

  caricaEsperienze(): void {
    this.dataService.getEsperienze().subscribe(
      (data) => {
        this.esperienze = data;
        this.filteredEsperienze = data; 
      },
      (error) => {
        console.error('Errore nel caricamento delle esperienze', error);
      }
    );
  }


}

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
  favoriti: number[] = [];
  userId: number | null | undefined;

  constructor(
    private authSrv: AuthService,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaEsperienze();
  }

  isLoggedIn(): boolean {
    return this.authSrv.getToken() !== null;
  }

  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  onSearchInput(): void {
    // Se il campo di ricerca è vuoto, ripristiniamo tutte le esperienze
    if (this.searchTerm.trim() === '') {
      this.filteredEsperienze = this.esperienze;
    }
  }

  cercaPerLuogo(): void {
    if (this.searchTerm.trim() !== '') {
      this.dataService.cercaPerLuogo(this.searchTerm).subscribe(
        (data) => {
          this.filteredEsperienze = data; // Assegniamo i risultati filtrati a filteredEsperienze
        },
        (error) => {
          console.error('Errore nella ricerca per luogo', error);
        }
      );
    } else {
      // Gestione caso di ricerca vuota o non valida
      this.filteredEsperienze = this.esperienze; // Se il termine di ricerca è vuoto, mostrare tutte le esperienze
    }
  }

  private caricaEsperienze(): void {
    // Esempio di caricamento iniziale delle esperienze
    this.dataService.getEsperienze().subscribe(
      (data) => {
        this.esperienze = data;
        this.filteredEsperienze = data; // Inizialmente, filteredEsperienze contiene tutte le esperienze
      },
      (error) => {
        console.error('Errore nel caricamento delle esperienze', error);
      }
    );
  }
}

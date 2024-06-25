import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-favoriti',
  templateUrl: './favoriti.component.html',
  styleUrls: ['./favoriti.component.scss']
})
export class FavoritiComponent {
  favoriti: any[] = [];
  errorMessage: string | null = null;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.getFavoritiByLoggedUser();
   }

   getFavoritiByLoggedUser(): void {
    this.errorMessage = null;
    this.dataService.getFavoritiByLoggedUser()
      .subscribe(
        (data) => {
          this.favoriti = data;
        },
        (error) => {
          console.error('Errore durante il recupero dei favoriti', error);
          this.errorMessage = 'Errore durante il recupero dei favoriti, riprova più tardi.';
        }
      );
  }

  rimuoviDaPreferiti(id: number) {
    this.dataService.rimuoviDaiPreferiti(id).subscribe(
      (response) => {
        console.log('Elemento rimosso dai preferiti:', response);
        this.favoriti = this.favoriti.filter(favorito => favorito.esperienza.id !== id);
      },
      (error) => {
        console.error('Errore durante la rimozione dai preferiti:', error);
      
      }
    );
  }

}

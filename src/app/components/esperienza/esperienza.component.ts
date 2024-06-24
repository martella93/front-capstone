import { Component, Input } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-esperienza',
  templateUrl: './esperienza.component.html',
  styleUrls: ['./esperienza.component.scss']
})
export class EsperienzaComponent {

  //esperienze: any[] | undefined;
  @Input() esperienze: any[] = [];
  preferiti: number [] = []; // Array di ID delle esperienze preferite

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.caricaPreferiti();
  }

  caricaPreferiti(): void {
    this.dataService.getFavoritiByLoggedUser().subscribe(
      (preferitiIds: number[]) => {
        this.preferiti = preferitiIds;
      },
      error => {
        console.error('Errore nel recupero dei preferiti', error);
      }
    );
  }

  togglePreferito(esperienza: any): void {
    const index = this.preferiti.indexOf(esperienza.id);
    if (index !== -1) {
      this.dataService.rimuoviDaiPreferiti(esperienza.id).subscribe(
        () => {
          console.log(`Rimosso dai preferiti: ${esperienza.id}`);
          this.preferiti.splice(index, 1); // Rimuovi l'ID dalla lista dei preferiti
        },
        error => {
          console.error('Errore nella rimozione dai preferiti', error);
        }
      );
    } else {
      console.log(`Aggiungi ai preferiti: ${esperienza.id}`);
      this.dataService.aggiungiAiPreferiti(esperienza.id).subscribe(
        () => {
          console.log(`Aggiunto ai preferiti: ${esperienza.id}`);
          this.preferiti.push(esperienza.id); // Aggiungi l'ID alla lista dei preferiti
        },
        error => {
          console.error('Errore nell\'aggiunta ai preferiti', error);
        }
      );
    }
  }

  isPreferito(esperienza: any): boolean {
    return this.preferiti.includes(esperienza.id);
  }
  

 
}

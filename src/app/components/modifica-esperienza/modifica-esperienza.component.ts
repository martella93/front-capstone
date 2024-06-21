import { Component, Input } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';
import { EsperienzaServiceService } from 'src/app/service/esperienza-service.service';

@Component({
  selector: 'app-modifica-esperienza',
  templateUrl: './modifica-esperienza.component.html',
  styleUrls: ['./modifica-esperienza.component.scss'],
})
export class ModificaEsperienzaComponent {
  @Input() esperienze: any[] = [];
  esperienzaDaAggiornare: any = {
    titolo: '',
    descrizione: '',
    luogo: '',
    dataInizio: '',
    dataFine: '',
    ora: '',
    durata: '',
    programma: '',
    prezzo: '',
    postiEsperienza: '',
    puntiEsperienza: '',
    categoria: '',
  };
  fileFoto: File[] = [];
  fileVideo: File[] = [];
  filteredEsperienze: any[] = [];
  esperienzaInModifica: any | null = null;

  constructor(
    private esperienzaService: EsperienzaServiceService,
    private dataSrv: DataServiceService
  ) {}

  ngOnInit(): void {
    this.caricaEsperienze();
  }

  private caricaEsperienze(): void {
    this.dataSrv.getEsperienze().subscribe(
      (data) => {
        this.esperienze = data;
        this.filteredEsperienze = data;
      },
      (error) => {
        console.error('Errore nel caricamento delle esperienze', error);
      }
    );
  }

  cancellaEsperienza(id: number): void {
    this.esperienzaService.cancellaEsperienza(id).subscribe(
      () => {
        this.esperienze = this.esperienze.filter((e) => e.id !== id);
        console.log('Esperienza cancellata con successo');
      },
      (error) =>
        console.error("Errore nella cancellazione dell'esperienza", error)
    );
  }

  modificaEsperienza(id: number, esperienza: any): void {
    this.esperienzaService.modificaEsperienza(id, esperienza).subscribe(
      (response) => {
        this.aggiornaEsperienza();
        console.log('Esperienza modificata con successo:', response);
        // Gestisci la risposta dal server, se necessario
      },
      (error) => {
        console.error("Errore durante la modifica dell'esperienza:", error);
        // Gestisci l'errore, se necessario
      }
    );
  }

  aggiornaEsperienza(): void {
    if (this.esperienzaInModifica) {
      this.esperienzaService
        .aggiornaEsperienza(this.esperienzaInModifica)
        .subscribe(
          (esperienza) => {
            const index = this.esperienze.findIndex(
              (e) => e.id === esperienza.id
            );
            if (index !== -1) {
              this.esperienze[index] = esperienza;
            }
            this.esperienzaInModifica = null;
          },
          (error) =>
            console.error("Errore nell'aggiornamento dell'esperienza", error)
        );
    }
  }

  attivaModifica(esperienza: any): void {
    this.esperienzaInModifica = { ...esperienza }; // Clona l'esperienza per evitare modifiche dirette
  }

  annullaModifica(): void {
    this.esperienzaInModifica = null;
  }
}

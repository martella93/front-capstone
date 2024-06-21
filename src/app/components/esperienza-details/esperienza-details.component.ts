import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/service/data-service.service';
import { EsperienzaServiceService } from 'src/app/service/esperienza-service.service';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';

@Component({
  selector: 'app-esperienza-details',
  templateUrl: './esperienza-details.component.html',
  styleUrls: ['./esperienza-details.component.scss'],
})
export class EsperienzaDetailsComponent implements OnInit {
  esperienza: any;
  guida: any = { nome: '', cognome: '', descrizione: '', lingue: '', anniEsperienza: '' };
  prenotazione: any[] = [];
  selectedDate: Date = new Date();
  selectedEsperienza: any;
  postiPrenotati: number | undefined;
  postiDaPrenotare: number | undefined;
  selectedTime: string | undefined; 

  recensione = {
    commento: '',
    valutazione: 1,
  };

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    private prenotazioneSrv: PrenotazioneService,
    private esperienzaSrv: EsperienzaServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.dataService.getEsperienzaById(id).subscribe(
          (data) => {
            this.esperienza = data;
            this.caricaGuida(this.esperienza.id); // Carica la guida associata all'esperienza
            this.caricaPostiPrenotati(); // Carica i posti prenotati all'inizio
          },
          (error) => {
            console.error(`Errore durante il recupero dell'esperienza con ID ${id}`, error);
          }
        );
      }
    });
  }

  // Metodo per caricare la guida associata all'esperienza
  caricaGuida(esperienzaId: number): void {
    this.esperienzaSrv.getGuidaByEsperienzaId(esperienzaId).subscribe(
      (data) => {
        this.guida = data;
      },
      (error) => {
        console.error(`Errore durante il recupero della guida per l'esperienza con ID ${esperienzaId}`, error);
      }
    );
  }

  // Metodo per caricare i posti prenotati per questa esperienza e data
  caricaPostiPrenotati(): void {
    const esperienzaId = this.esperienza.id; // Recupera l'id dell'esperienza
    const dataFormatted = this.formatDate(this.selectedDate); // Formatta la data, se necessario
    this.prenotazioneSrv.getPostiPrenotati(esperienzaId, dataFormatted).subscribe(
      (response) => {
        this.postiPrenotati = response; // Assegna il valore dei posti prenotati ricevuti dal backend
      },
      (error) => {
        console.error('Errore durante il recupero dei posti prenotati:', error);
      }
    );
  }

  // Metodo per formattare la data se necessario
  private formatDate(date: Date): string {
    // Implementa la formattazione della data qui se necessario
    return date.toISOString(); // Esempio: restituisce la data nel formato ISO
  }

  // Metodo per creare una recensione per l'esperienza
  creaRecensione(esperienzaId: number, recensione: any): void {
    this.dataService.createRecensione(esperienzaId, recensione).subscribe(
      (response) => {
        console.log('Recensione creata con successo', response);
        this.recensione = { valutazione: 0, commento: '' }; // Pulisce il form dopo la creazione della recensione
      },
      (error) => {
        console.error('Errore nella creazione della recensione', error);
      }
    );
  }

  // Metodo per prenotare l'esperienza
 prenotaEsperienza(esperienzaId: number, prenotazione: any): void {
    this.prenotazioneSrv.prenotaEsperienza(esperienzaId, prenotazione).subscribe(
      (response) => {
        console.log('Prenotazione effettuata con successo', response);
        // Aggiungi la prenotazione alla lista delle prenotazioni se necessario
        // Esegui altre operazioni necessarie dopo la prenotazione
      },
      (error) => {
        console.error('Errore nella prenotazione', error);
      }
    );
  }

}

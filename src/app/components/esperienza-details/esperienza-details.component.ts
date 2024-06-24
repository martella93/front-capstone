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
 
  guida: any = { nome: '', cognome: '', descrizione: '', lingue: '', anniEsperienza: '' };
  prenotazione: any[] = [];
  
  selectedEsperienza: any;
  postiPrenotati: number | undefined;
 
  
  date: string | undefined;
  esperienza: any; // Oggetto dell'esperienza corrente
  selectedDate: Date = new Date(); // Data selezionata
  selectedTime: string = ''; // Ora selezionata
  postiDaPrenotare: number | undefined;
  errorMessage: string | undefined; // Eventuale messaggio di errore
  successMessage: string | undefined;

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
            this.caricaGuida(this.esperienza.id); 
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
  prenotaEsperienza(): void {
    if (!this.selectedDate || !this.selectedTime || !this.postiDaPrenotare) {
      this.errorMessage = 'Per favore, completa tutti i campi.';
      return;
    }

    const prenotazione = {
      data: this.selectedDate.toISOString().substring(0, 10), // Converte la data in formato ISO yyyy-mm-dd
      ora: this.selectedTime,
      postiPrenotati: this.postiDaPrenotare,
      dataPrenotazione: new Date().toISOString() // Inizializza la data di prenotazione in formato ISO
    };

    // Invia la prenotazione al servizio PrenotazioneService
    this.prenotazioneSrv.prenotaEsperienza(this.esperienza.id, prenotazione).subscribe(
      (response) => {
        console.log('Prenotazione effettuata con successo', response);
        this.successMessage = 'Prenotazione effettuata con successo!';
        this.errorMessage = undefined; // Pulisce eventuali errori precedenti
      },
      (error) => {
        console.error('Errore nella prenotazione', error);
        this.errorMessage = 'Errore durante la prenotazione. Per favore, riprova più tardi.';
        this.successMessage = undefined; // Pulisce eventuali messaggi di successo precedenti
      }
    );
  }
  
  
}

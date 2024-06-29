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
  guida: any = {
    nome: '',
    cognome: '',
    descrizione: '',
    lingue: '',
    anniEsperienza: '',
  };
  prenotazione: any[] = [];
  recensioni: any[] = [];
  esperienzaId: number | undefined;

  selectedEsperienza: any;

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
  startDate: any;
  hoveredRating: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    private prenotazioneSrv: PrenotazioneService,
    private esperienzaSrv: EsperienzaServiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.esperienzaId = +id;
        this.dataService.getEsperienzaById(id).subscribe(
          (data) => {
            this.esperienza = data;
            this.caricaGuida(this.esperienza.id);
            this.getRecensioni();
          },
          (error) => {
            console.error(
              `Errore durante il recupero dell'esperienza con ID ${id}`,
              error
            );
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
        console.error(
          `Errore durante il recupero della guida per l'esperienza con ID ${esperienzaId}`,
          error
        );
      }
    );
  }

  // Metodo per formattare la data se necessario
  private formatDate(date: Date): string {
    return date.toISOString(); 
  }

  // Metodo per creare una recensione per l'esperienza
  creaRecensione(esperienzaId: number, recensione: any): void {
    this.dataService.createRecensione(esperienzaId, recensione).subscribe(
      (response) => {
        console.log('Recensione creata con successo', response);
        this.recensione = { valutazione: 0, commento: '' };
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

    // Crea un oggetto Date dalla stringa selectedDate
    const dateObj = new Date(this.selectedDate);

    // Verifica che la data sia valida
    if (isNaN(dateObj.getTime())) {
      this.errorMessage = 'Data non valida.';
      return;
    }

    const prenotazione = {
      data: dateObj.toISOString().substring(0, 10), // Converte la data in formato ISO yyyy-mm-dd
      ora: this.selectedTime,
      postiPrenotati: this.postiDaPrenotare,
      dataPrenotazione: new Date().toISOString(), // Inizializza la data di prenotazione in formato ISO
    };

    this.prenotazioneSrv
      .prenotaEsperienza(this.esperienza.id, prenotazione)
      .subscribe(
        (response) => {
          console.log('Prenotazione effettuata con successo', response);
          this.successMessage = 'Prenotazione effettuata con successo!';
          this.errorMessage = undefined; 
          this.selectedDate = new Date();
          this.selectedTime = '';
          this.postiDaPrenotare = 1;
        },
        (error) => {
          console.error('Errore nella prenotazione', error);
          if (error.status === 500) {
            this.errorMessage =
              'Errore: i posti sono esauriti per questa data. Riprova con una data diversa.';
          } else {
            this.errorMessage =
              'Errore durante la prenotazione. Per favore, riprova più tardi.';
          }
          this.successMessage = undefined;
        }
      );
  }

  getRecensioni(): void {
    if (this.esperienzaId !== undefined) {
      this.dataService.getRecensioniByEsperienza(this.esperienzaId).subscribe(
        (data: any[]) => {
          console.log('Recensioni ricevute:', data); 
          this.recensioni = data;
        },
        (error) => {
          console.error('Errore nel recupero delle recensioni', error);
          this.errorMessage = 'Errore nel recupero delle recensioni';
        }
      );
    } else {
      console.error('esperienzaId is undefined');
    }
  }

  setRating(rating: number) {
    this.recensione.valutazione = rating;
  }

  setTemporaryRating(rating: number) {
    this.hoveredRating = rating;
  }

  resetTemporaryRating() {
    this.hoveredRating = null;
  }
}

import { Component } from '@angular/core';
import { EsperienzaServiceService } from 'src/app/service/esperienza-service.service';

@Component({
  selector: 'app-crea-esperienza',
  templateUrl: './crea-esperienza.component.html',
  styleUrls: ['./crea-esperienza.component.scss']
})
export class CreaEsperienzaComponent {

  esperienze: any[] = [];
  nuovaEsperienza:any = { id: 0, titolo: '', descrizione: '', luogo: '',dataInizio: '',dataFine: '',ora: '', durata:'',programma: '',prezzo: '',postiEsperienza:'', puntiEsperienza:'',categoria: '',};
  esperienzaInModifica: any | null = null;
  fileFoto: File[] = [];
  fileVideo: File[] = [];

  constructor(private esperienzaService: EsperienzaServiceService) { }

  ngOnInit(): void {
    this.caricaEsperienze();
  }

  caricaEsperienze(): void {
    this.esperienzaService.getEsperienze()
      .subscribe(
        esperienze => this.esperienze = esperienze,
        error => console.error('Errore nel caricamento delle esperienze', error)
      );
  }

  creaEsperienza(): void {
    this.esperienzaService.creaEsperienza(this.nuovaEsperienza)
      .subscribe(
        esperienza => {
          this.esperienze.push(esperienza);
          this.nuovaEsperienza = { id: 0, titolo: '', descrizione: '', luogo: '', dataInizio: '', dataFine: '', ora: '', durata: '', programma: '', prezzo: '', postiEsperienza: '', puntiEsperienza: '', categoria: '' };
        },
        error => console.error('Errore nella creazione dell\'esperienza', error)
      );
  }

  aggiornaEsperienza(): void {
    if (this.esperienzaInModifica) {
      this.esperienzaService.aggiornaEsperienza(this.esperienzaInModifica)
        .subscribe(
          esperienza => {
            const index = this.esperienze.findIndex(e => e.id === esperienza.id);
            if (index !== -1) {
              this.esperienze[index] = esperienza;
            }
            this.esperienzaInModifica = null;
          },
          error => console.error('Errore nell\'aggiornamento dell\'esperienza', error)
        );
    }
  }



  gestisciFotoSelezionate(event: any): void {
    this.fileFoto = event.target.files;
  }
  
  gestisciVideoSelezionati(event: any): void {
    this.fileVideo = event.target.files;
  }


  caricaFoto(): void {
    if (this.esperienzaInModifica && this.fileFoto.length > 0) {
      this.esperienzaService.uploadFotoEsperienza(this.esperienzaInModifica.id, this.fileFoto)
        .subscribe(
          message => {
            console.log('Foto caricate con successo', message);
            // Esegui altre operazioni se necessario
          },
          error => console.error('Errore nel caricamento delle foto', error)
        );
    }
  }

  caricaVideo(): void {
    if (this.esperienzaInModifica && this.fileVideo.length > 0) {
      this.esperienzaService.uploadVideoEsperienza(this.esperienzaInModifica.id, this.fileVideo)
        .subscribe(
          message => {
            console.log('Video caricati con successo', message);
            // Esegui altre operazioni se necessario
          },
          error => console.error('Errore nel caricamento dei video', error)
        );
    }
  }
}

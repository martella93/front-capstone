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
  messaggio: string = '';
  
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
    this.esperienzaService.creaEsperienza(this.nuovaEsperienza).subscribe(
      (response) => {
        console.log('Esperienza creata con successo:', response);
        this.messaggio = 'Esperienza creata con successo!';
        this.nuovaEsperienza = {
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
          categoria: ''
        };
      },
      (error) => {
        console.error('Errore durante la creazione dell\'esperienza:', error);
        this.messaggio = 'Si è verificato un errore durante la creazione dell\'esperienza.';
      }
    );
  }


  
}

import { Component } from '@angular/core';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent {

  prenotazioni: any[] = [];

  constructor(private prenotazioneSrv: PrenotazioneService) {}

  ngOnInit(): void {
    this.prenotazioneSrv.getPrenotazioniByUser().subscribe(
      (data) => {
        this.prenotazioni = data;
      },
      (error) => {
        console.error('Errore nel recupero delle prenotazioni dell\'utente', error);
      }
    );
  }

  cancellaPrenotazione(id: number): void {
    this.prenotazioneSrv.cancellaPrenotazione(id).subscribe(
      () => {
        this.prenotazioni = this.prenotazioni.filter(prenotazione => prenotazione.id !== id);
      },
      (error) => {
        console.error('Errore nella cancellazione della prenotazione', error);
      }
    );
  }
}

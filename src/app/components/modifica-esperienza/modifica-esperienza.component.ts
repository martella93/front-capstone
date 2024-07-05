import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';
import { EsperienzaServiceService } from 'src/app/service/esperienza-service.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-modifica-esperienza',
  templateUrl: './modifica-esperienza.component.html',
  styleUrls: ['./modifica-esperienza.component.scss'],
})
export class ModificaEsperienzaComponent implements AfterViewInit {
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
  selectedExperience: any | null = null;

  @ViewChild('infoModal') infoModal: ElementRef | undefined;

  constructor(
    private esperienzaService: EsperienzaServiceService,
    private dataSrv: DataServiceService
  ) {}

  ngOnInit(): void {
    this.caricaEsperienze();
  }

  ngAfterViewInit(): void {
    if (!this.infoModal) {
      console.error("infoModal is not defined");
    }
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
       
      },
      (error) => {
        console.error("Errore durante la modifica dell'esperienza:", error);
      
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
    this.esperienzaInModifica = { ...esperienza }; 
  }

  annullaModifica(): void {
    this.esperienzaInModifica = null;
  }

  openModal(esperienza: any): void {
    this.selectedExperience = esperienza;
    if (this.infoModal) {
      const modalElement = new bootstrap.Modal(this.infoModal.nativeElement);
      modalElement.show();
    } else {
      console.error("infoModal is not defined");
    }
  }

  handleFileInput(event: any): void {
    const files: File[] = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.fileFoto.push(files[i]);
    }
  }

  salvaNuovaFoto(): void {
    if (this.selectedExperience && this.fileFoto.length > 0) {
      this.esperienzaService.uploadFotoEsperienza(this.selectedExperience.id, this.fileFoto).subscribe(
        (response) => {
          console.log('Foto aggiunte con successo:', response);
          this.aggiornaEsperienza(); 
          this.fileFoto = []; 
          const modalElement = new bootstrap.Modal(this.infoModal?.nativeElement);
          modalElement.hide(); 
        },
        (error) => {
          console.error("Errore durante il caricamento delle foto:", error);
        }
      );
    } else {
      console.error("Seleziona almeno una foto da caricare.");
    }
  }
}

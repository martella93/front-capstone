import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EsperienzaServiceService } from 'src/app/service/esperienza-service.service';

@Component({
  selector: 'app-guida',
  templateUrl: './guida.component.html',
  styleUrls: ['./guida.component.scss']
})
export class GuidaComponent implements OnInit {
 guida: any;

 constructor(
  private route: ActivatedRoute,
  private esperienzaSrv: EsperienzaServiceService
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const esperienzaId = +params.get('id')!;
    if (!isNaN(esperienzaId)) {
      this.caricaGuida(esperienzaId);
    } else {
      console.error('ID esperienza non valido');
    }
  });
}

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

}

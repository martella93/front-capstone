import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {
  loggedUser: any;

  constructor(private dataSrv: DataServiceService) { }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.dataSrv.getUserLogged()
      .subscribe(
        (user: any) => {
          this.loggedUser = user;
          console.log('Dati utente loggato:', user);
        },
        error => {
          console.error('Errore durante il recupero dell\'utente loggato:', error);
        }
      );
  }
}



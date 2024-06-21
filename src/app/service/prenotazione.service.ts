import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  private apiUrl = 'http://localhost:8080/api'; // Assicurati di sostituire con il tuo URL di base

  constructor(private http: HttpClient) {}

  prenotaEsperienza(esperienzaId: number, prenotazione: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/esperienze/${esperienzaId}/prenotazioni`, prenotazione);
  }

  getPrenotazioni(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prenotazioni`);
  }

  getPrenotazioneById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prenotazioni/${id}`);
  }

  cancellaPrenotazione(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/prenotazioni/${id}`, {responseType: 'text' as 'json',});
  }
  getPrenotazioniByUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prenotazioni/user`);
  }

  getEsperienzeByPrenotazione(prenotazioneId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prenotazioni/${prenotazioneId}/esperienze`);
  }

  getPostiPrenotati(esperienzaId: number, data: string): Observable<number> {
    const url = `${this.apiUrl}/prenotazioni/postiPrenotati/${esperienzaId}?data=${data}`;
    return this.http.get<number>(url);
  }
}

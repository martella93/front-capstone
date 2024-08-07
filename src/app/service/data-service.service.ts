import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

private localhost = 'http://localhost:8080';

  constructor(private http: HttpClient,  private authService: AuthService) { }

  getEsperienze(): Observable<any> {
    return this.http.get(`${this.localhost}/api/esperienze`);
  }

  getEsperienzaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.localhost}/api/esperienze/${id}`);
  }

  getGuidaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.localhost}/api/guida/${id}`);
  }

  cercaPerLuogo(luogo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.localhost}/api/esperienze/cercaPerLuogo?luogo=${luogo}`);
  }
  
  getFavoriti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.localhost}/api/favoriti`);
  }

  getFavoritiByLoggedUser(): Observable<any> {
    return this.http.get<any>(`${this.localhost}/api/favoriti/loggedUser`);
  }

  aggiungiAiPreferiti(id: number): Observable<string> {
    return this.http.post<string>(`${this.localhost}/api/favoriti/add/${id}`, null, { responseType: 'text' as 'json' });
  }

  rimuoviDaiPreferiti(id: number): Observable<string> {
    return this.http.delete<string>(`${this.localhost}/api/favoriti/remove/${id}`, { responseType: 'text' as 'json' });
  }

  createRecensione(esperienzaId: number, recensione: any): Observable<string> {
    return this.http.post<string>(`${this.localhost}/api/recensione/${esperienzaId}`, recensione, { responseType: 'text' as 'json' });
  }

  updateRecensione(id: number, recensione: any): Observable<any> {
    return this.http.put(`${this.localhost}/api/recensione/${id}`, recensione);
  }
  deleteRecensione(id: number): Observable<any> {
    return this.http.delete(`${this.localhost}/api/recensione/${id}`);
  }
  getRecensioniByEsperienza(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.localhost}/api/recensione/${id}`);
  }

  getUserLogged(): Observable<any> {
    return this.http.get<any>(`${this.localhost}/api/userLogged`);
  }
 
 
  }


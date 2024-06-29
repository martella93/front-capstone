import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EsperienzaServiceService {
  private apiUrl = 'http://localhost:8080/api/esperienze';

  constructor(private http: HttpClient) {}

  private handleError(error: any): Observable<any> {
    console.error('Errore nella chiamata API:', error);
    throw error;
  }

  getEsperienze(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getEsperienzaById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  creaEsperienza(esperienza: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, esperienza, {responseType: 'text' as 'json',});
  }

  aggiornaEsperienza(esperienza: any): Observable<any> {
    const url = `${this.apiUrl}/${esperienza.id}`;
    return this.http
      .put<any>(url, esperienza)
      .pipe(catchError(this.handleError));
  }
  modificaEsperienza(id: number, esperienza: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, esperienza);
  }

  cancellaEsperienza(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }

  uploadFotoEsperienza(id: number, foto: File[]): Observable<string> {
    const formData = new FormData();
    foto.forEach((file) => formData.append('foto', file));
    return this.http.patch<string>(`${this.apiUrl}/${id}/upload-foto`, formData);
  }

  uploadVideoEsperienza(id: number, video: File[]): Observable<string> {
    const url = `${this.apiUrl}/${id}/upload-video`;
    const formData = new FormData();
    video.forEach((v) => formData.append('video', v, v.name));

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http
      .patch<string>(url, formData, { headers })
      .pipe(catchError(this.handleError));
  }
  getGuidaByEsperienzaId(esperienzaId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${esperienzaId}/guida`
    );
  }
}

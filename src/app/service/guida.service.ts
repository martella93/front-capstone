import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuidaService {

  private apiUrl = '/api/guida';
  constructor(private http: HttpClient) {}

  getAllGuida(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getGuidaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

 
  createGuida(guida: any, esperienzaId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}?esperienzaId=${esperienzaId}`, guida);
  }

  updateGuida(id: number, guida: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, guida);
  }

  deleteGuida(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  uploadFotoGuida(id: number, foto: File[]): Observable<string> {
    const formData: FormData = new FormData();
    for (let i = 0; i < foto.length; i++) {
      formData.append('foto', foto[i], foto[i].name);
    }
    return this.http.patch<string>(`${this.apiUrl}/${id}/upload-foto`, formData);
  }

  uploadVideoGuida(id: number, video: File[]): Observable<string> {
    const formData: FormData = new FormData();
    for (let i = 0; i < video.length; i++) {
      formData.append('video', video[i], video[i].name);
    }
    return this.http.patch<string>(`${this.apiUrl}/${id}/upload-video`, formData);
  }


}

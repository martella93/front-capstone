import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(data: { username: string; password: string}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/login`, data, { headers, responseType: 'json'});
}

  signup(data: { username: string; password: string}): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/signup`, data, { headers });
}

setToken(token: string): void {
  localStorage.setItem('authToken', token);
}

getToken(): string | null {
  return localStorage.getItem('authToken');
}


logout(): void {
  localStorage.removeItem('authToken');
}


}

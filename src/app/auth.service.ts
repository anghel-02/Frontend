import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:9001/";
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(false);
  }

  signup(body: {}): Observable<any> {
    return this.http.put(this.url + "user/register", body);
  }

  createNFT(body: {}): Observable<any> {
    return this.http.post(this.url + "nft/create", body);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(this.url + 'user/login', body)
      .pipe(
        tap(response => {
          console.log('Response from server:', response);
          console.log('JWT Token:', response.token);

          // Salva il token nel local storage
          localStorage.setItem('authToken', response.token);

          // Creare un nuovo HttpHeaders con l'intestazione "Authorization"
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${response.token}`
          });

          // Aggiungi le intestazioni alla richiesta
          const options = { headers: headers };

          // Esegui la richiesta con le nuove intestazioni
          this.http.post<any>(this.url + 'user/login', body, options);

          this.isLoggedInSubject.next(true);
        }),
        catchError(() => {
          this.isLoggedInSubject.next(false);
          return EMPTY;
        })
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }

  logout(): void {
    // Rimuovi il token dal local storage e aggiorna lo stato di autenticazione
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

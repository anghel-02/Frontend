// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';


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
    return this.http.put(this.url + "user/register", body)
      .pipe(
        catchError(error => {
          console.error('Errore durante la registrazione:', error);
          return throwError(error); // Rilancia l'errore
        })
      );
  }



  login(): void {
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

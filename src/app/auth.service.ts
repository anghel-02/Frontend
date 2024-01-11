import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= 'postgresql://postgres:angelo2002@localhost:5432/postgres'
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http : HttpClient) {
    // Simuliamo un utente loggato all'inizio (modifica questa logica con la tua autenticazione effettiva)
    this.isLoggedInSubject.next(true);
  }

signup(body: {}): Observable<any> {
  return this.http.post(this.url, body)
}


  login(): void {
    // Implementa la logica di login effettiva, ad esempio, interagendo con un server
    // Qui simuliamo il login impostando isLoggedIn a true
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    // Implementa la logica di logout effettiva, ad esempio, interagendo con un server
    // Qui simuliamo il logout impostando isLoggedIn a false
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    // Restituisce lo stato corrente di autenticazione
    return this.isLoggedInSubject.value;
  }
}

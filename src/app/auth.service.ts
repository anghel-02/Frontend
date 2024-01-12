import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { AuthToken, Userregister } from './model/userregister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url= "http://localhost:9001"
  public token?:string | null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http : HttpClient) {
    // Simuliamo un utente loggato all'inizio (modifica questa logica con la tua autenticazione effettiva)
    this.isLoggedInSubject.next(true);
  }

  signup(nome:string, cognome: string, username:string, password:string){
    let user:Userregister = {"nome":nome, "cognome":cognome, "username": username, "password": password};
    this.http.post<AuthToken>(this.url + "user/register",user,{withCredentials: true})
    .subscribe(response => {
      console.log(user)
    });
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



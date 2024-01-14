import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import {catchError, finalize, tap, throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(private authService: AuthService) {}


  hide: any;


  onSubmit = (form: NgForm) => {
    const nome = form.value.nome;
    const cognome = form.value.cognome;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.signup({ nome, cognome, username, password })
      .pipe(
        tap(data => {
          console.log('Risposta dal server:', data);
        }),
        catchError(error => {
          console.error('Errore durante la registrazione:', error);

          if (error.status === 401) {
            console.log('Accesso negato. Effettua l\'accesso per continuare.');
          } else {
            // Gestisci altri tipi di errori qui, se necessario.
          }

          return throwError(error);
        }),
        finalize(() => {
          console.log(nome, cognome, username, password);
        })
      )
      .subscribe();
  }
}

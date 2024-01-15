import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService} from "../../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = new FormControl();
  pass = new FormControl();
  hide = true;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const username = this.user.value;
    const password = this.pass.value;

    this.authService.login(username, password).subscribe(
      () => {
        // Login avvenuto con successo
        console.log('Login success');
        // Puoi eseguire altre azioni, reindirizzare l'utente, ecc.
      },
      error => {
        // Gestisci gli errori durante il login
        console.error('Login failed', error);
        // Puoi mostrare un messaggio di errore all'utente, riportare un problema, ecc.

        // Aggiungi questa riga per visualizzare più dettagli sull'errore
        console.error('Error details:', error.error);
      }
    );
  }

}



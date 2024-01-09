import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  user = new FormControl ();
  pass = new FormControl (); 
  email = new FormControl (); 
  authcode = new FormControl (); 
  nome = new FormControl (); 
  cognome = new FormControl (); 
  datanascita = new FormControl (); 
  hide: any;


  onSubmit(form: NgForm){
    let user = this.user.value
    let pass = this.pass.value
    let email = this.email.value
    let authcode = this.authcode.value
    let nome = this.nome.value
    let cognome = this.cognome.value
    let datanascita = this.datanascita.value

   //this.auth.login(user, pass);
 }
}

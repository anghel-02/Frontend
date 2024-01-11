import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  
  constructor(private authService: AuthService) {}
  
  hide: any;


  onSubmit(form: NgForm){
    const nome = form.value.nome
    const cognome = form.value.cognome 
    const username = form.value.username
    const password = form.value.password
    this.authService.signup({nome: nome, cognome: cognome, username: username, password: password, returnSecureToken: true}).subscribe(data =>{
      console.log(data);
    })
    
 }
}

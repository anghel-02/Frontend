import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(private authService: AuthService) {}


  onSubmit = (form: NgForm) => {
    const name = form.value.nome;
    const surname = form.value.cognome;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.signup({ name, surname, username, password }).subscribe(data =>{
      console.log(form);
      form.reset();
    })
      
  }
}



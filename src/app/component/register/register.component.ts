import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  registrationSuccess = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit = (form: NgForm) => {
    const name = form.value.nome;
    const surname = form.value.cognome;
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signup({ name, surname, username, password }).subscribe(data =>{
      this.router.navigate(['login']);
      form.reset();
    })
    
  }
}



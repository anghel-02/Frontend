import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  nome= new FormControl()
  cognome= new FormControl()
  username= new FormControl()
  password= new FormControl()
  
  constructor(private authService: AuthService) {}
  
  hide: any;


  onSubmit(){
    let nome =this.nome.value
    let cognome =this.cognome.value
    let username =this.username.value
    let password =this.password.value

    this.authService.signup(nome,cognome,username,password)
    
 }
}

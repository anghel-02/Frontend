import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = new FormControl ();
  pass = new FormControl ();  
  authcode= new FormControl ();  
  hide: any;

  //constructor(private auth:AuthServiceService){}
  
  onSubmit(){
     let user = this.user.value
     let pass = this.pass.value
     let autcode= this.authcode.value

    //this.auth.login(user, pass);
  }
}

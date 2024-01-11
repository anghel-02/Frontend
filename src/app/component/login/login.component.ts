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
  hide: any;
  
  //constructor(private auth:AuthService){}


  onSubmit(){
    let user = this.user.value;
    let pass = this.pass.value;
    
    // this.auth.login(user, pass);
  }

}



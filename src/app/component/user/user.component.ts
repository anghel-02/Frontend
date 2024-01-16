import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  campiattivi=true;
  forever=true;
  hide: any;

  constructor(private auth: AuthService){}

    onSubmit(form : NgForm){
      const name = form.value.camponome
      const surname = form.value.campocognome
      const password = form.value.campopassword
      console.log(password)
      this.auth.updateuser({name, surname, password})
      
    }

  abilitacampi(){
    this.campiattivi = this.campiattivi ? false : true;
    
  }

}

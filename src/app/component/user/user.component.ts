import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RegisterComponent } from '../register/register.component';
import { Usermodel } from '../../model/usermodel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  campiattivi=true;
  forever=true;
  hide: any;
  userdata! : Usermodel;

  constructor(private auth: AuthService){}


  ngOnInit(): void {
    const username = this.auth.getUsername();
    this.auth.getUserByUsername(username).subscribe(data =>{
      this.userdata = data;
    })
  }
  inviaForm(form : NgForm){

  }

    onSubmit(form : NgForm){
      const name = form.value.camponome
      const surname = form.value.campocognome
      const password = form.value.campopassword
      this.auth.updateuser({name, surname, password})
      this.abilitacampi();

    }

  abilitacampi(){
    this.campiattivi = this.campiattivi ? false : true;

  }

}

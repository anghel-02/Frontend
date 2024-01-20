import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Usermodel } from '../../model/usermodel';
import { payment } from '../../model/payment';

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
  userpayment: any[]= [];
  selectedWallet!: any;
  type = -1;
  

  

  constructor(private auth: AuthService){}


  ngOnInit(): void {
    const username = this.auth.getUsername();
    this.auth.getUserByUsername(username).subscribe(data =>{
      this.userdata = data;
    })
    this.auth.getwallet().subscribe((data: any[]) => {
      this.userpayment = data.map(item => item.balance);
    });
  }
  
  inviaForm(form : NgForm){
      const address = form.value.indirizzo;
      if (this.selectedWallet === 'opzione1'){
        this.type = 1;
        this.auth.seteurwallet(address);
      }
      else if(this.selectedWallet === 'opzione2') {
        this.type = 0;
        this.auth.setethwallet(address);
      }
      const username = this.auth.getUsername();
      this.auth.addwallet({address, username, type: this.type})
      
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

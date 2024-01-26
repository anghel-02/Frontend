import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Usermodel } from '../../model/usermodel';
import { payment } from '../../model/payment';
import { Router } from '@angular/router';

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
  usdbalance: any = -1;
  ethbalance: any = -1;
  selectedWallet!: any;
  type = -1;
  

  

  constructor(private auth: AuthService, private router: Router){}


  ngOnInit(): void {
    const username = this.auth.getUsername() ?? '';
    this.auth.getUserByUsername(username).subscribe(data =>{
      this.userdata = data;
    })
    this.auth.getwallet().subscribe((data: any[]) => {
      this.userpayment = data;
      console.log(this.userpayment)
      for (let el of this.userpayment){
        if(el.type==0 && this.ethbalance==-1 && el.balance!=0){
          this.ethbalance= el.balance;
          this.ethbalance=parseFloat(this.ethbalance.toFixed(4))
        }
        else if (el.type==1 && this.usdbalance==-1 && el.balance!=0){
          this.usdbalance= el.balance;
        }
      }
      
    });
  }
  
  inviaForm(form : NgForm){
      const address = form.value.indirizzo;
      if (this.selectedWallet === 'opzione1'){
        this.type = 1;
      }
      else if(this.selectedWallet === 'opzione2') {
        this.type = 0;
      }
      const username = this.auth.getUsername();
      this.auth.addwallet({address, username, type: this.type})

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });
      
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

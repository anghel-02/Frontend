import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  campiattivi=true;
  camponome!: string;
  campocognome!: string;
  campodatanascita!: string;
  campoemail!: string;
  campousername!: string;
  campopassword!: string;
  campoauthcode!: string;
  EURwallet!: number;
  ETHwallet!: number;
  hide: any;


  abilitacampi(){
    this.campiattivi=false;
  }

  abilitacampi2(){
    this.campiattivi=true;
  }
}

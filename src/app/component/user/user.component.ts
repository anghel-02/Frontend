import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  campiattivi=true;
  campo1!: string;
  campo2!: string;
  campo3!: string;
  campo4!: string;
  campo5!: string;
  campo6!: string;
  campo7!: string;
  campo8!: number;
  campo9!: number;
  hide: any;


  abilitacampi(){
    this.campiattivi=false;
  }

  abilitacampi2(){
    this.campiattivi=true;
  }
}

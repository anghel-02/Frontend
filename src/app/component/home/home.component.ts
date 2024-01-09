import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{

  onTabChanged(event: MatTabChangeEvent): void {
    console.log('Scheda cambiata:', event.index);

  }


}

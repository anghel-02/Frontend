import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent{
  constructor(private authService: AuthService) {}
  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
  /*login(): void {
    return this.authService.login();
  }*/
  logout(): void {
    return this.authService.logout();
  }

  onTabChanged(event: MatTabChangeEvent): void {
    console.log('Scheda cambiata:', event.index);
  }


}

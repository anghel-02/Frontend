import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.css'
})
export class NewHomeComponent{

  


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isMenuOpen = false;
}


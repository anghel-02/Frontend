import {Component, OnInit} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {AuthService} from "../../auth.service";
import { Router } from '@angular/router';
import {SearchService} from "../../search.service";
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  userRank: string = "";
  userName: string = "";
  intervalSubscription: any;
  constructor(private authService: AuthService, private route: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    // const checkInterval = 1000;
    // this.intervalSubscription = interval(checkInterval).subscribe(() => {});
    this.getUserRank();
    
  }

  updateSearch(value: string) {
    this.searchService.updateSearch(value);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  getUserRank(): void {
    let userName = this.authService.getUsername();
    if(userName!=null){
      this.authService.getUserByUsername(userName).subscribe(
        (data) => {
          this.userRank = data.rank;
          console.log("Rank:", this.userRank);
        },
        (error) => {
          console.error('Errore nel recupero del rank dell\'utente', error);
        }
      );
    }

  }
  convertToNumber(value: string): number {
    return parseInt(value, 10);
  }


  logout(): void {
    this.authService.removeToken();
    this.route.navigate(["home"])
  }

  onTabChanged(event: MatTabChangeEvent): void {
    console.log('Scheda cambiata:', event.index);
  }


}

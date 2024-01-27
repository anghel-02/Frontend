import { Injectable } from '@angular/core';
import { map, timer } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

interface Auction {
  id: number;
  endTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuctionserviceService {

  private auctions: Auction[] = [];
  private timeRemainingSubject: BehaviorSubject<{ [key: number]: number }> = new BehaviorSubject<{ [key: number]: number }>({});

  constructor() {}

  addAuction(id: number, durationSeconds: number): void {
    const auctionEndTime = new Date();
    auctionEndTime.setSeconds(auctionEndTime.getSeconds() + durationSeconds);
  
    this.auctions.push({ id, endTime: auctionEndTime });
  
    timer(0, 1000).subscribe(() => {
      const currentTime = new Date();
      const remainingTimes: { [key: number]: number } = {};
  
      this.auctions.forEach((auction) => {
        const timeDiff = (auction.endTime.getTime() - currentTime.getTime()) / 1000;
        const secondsRemaining = Math.max(0, Math.floor(timeDiff));
        remainingTimes[auction.id] = secondsRemaining;
      });
  
      this.timeRemainingSubject.next(remainingTimes);
    });
  }

  getTimeRemaining(auctionId: number): Observable<number> {
    return this.timeRemainingSubject.pipe(map((remainingTimes) => remainingTimes[auctionId] || 0));
  }

  


}

import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Subscription, interval } from 'rxjs';
import { InitialNavigationFeature, Router } from '@angular/router';
import { AuctionserviceService } from '../../auctionservice.service';

@Component({
  selector: 'app-buy-nft-auction',
  templateUrl: './buy-nft-auction.component.html',
  styleUrl: './buy-nft-auction.component.css'
})
export class BuyNftAuctionComponent implements AfterViewInit{
  nftmodel!: any;
  imageUrl: any;
  idsale!: any;
  address!: any;
  paymentMethods: string[] = ['USD', 'ETH'];
  selectedPaymentMethod!: any;
  alladdress: any []= [];
  offerta!: any;
  intervalSubscription!: Subscription;
  stop = false;
  eventSource: any;



  constructor(private nftservice : NFTService, private auth : AuthService, private route: Router, private astas: AuctionserviceService ){}
  

  createEventSource() {
    
    this.eventSource = new EventSource("http://localhost:9001/" + `sale/get/updates/${this.nftservice.getnftid()}`);

    this.eventSource.onmessage = (e: { data: string; }) => {
        const obj = JSON.parse(e.data);
        obj.event; // Può essere "newOffer" o "end"
        obj.nftId; // Id dell'nft
        obj.value; // (Solo per newOffer) nuovo valore dell'nft
    };

    this.eventSource.onerror = (e: any) => {
        this.eventSource.close();
        this.eventSource = this.createEventSource();
    }

    
    return this.eventSource;
}

  calcolaDifferenzaTraTimestamp(timestamp1: string, timestamp2: string): number {
    const data1 = new Date(timestamp1);
    const data2 = new Date(timestamp2);

    const differenzaInMillisecondi = data2.getTime() - data1.getTime();
    const differenzaInSecondi = differenzaInMillisecondi / 1000;

    return differenzaInSecondi;
  }

  // formatSecondsToTime(seconds: number): string {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const remainingSeconds = seconds % 60;

  //   const hoursString = String(hours).padStart(2, '0');
  //   const minutesString = String(minutes).padStart(2, '0');
  //   const secondsString = String(remainingSeconds).padStart(2, '0');

  //   return `${hoursString}:${minutesString}:${secondsString}`;
  // }

  formatSecondsToTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
  
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid() ?? '').subscribe(data =>{

      this.nftservice.getsaletabel(data.id).subscribe(res=>{
        this.idsale=data.id;
        this.nftmodel= data;
        let durata = this.formatSecondsToTime(this.calcolaDifferenzaTraTimestamp(res.creationDate ,res.endTime));
        this.nftmodel['durata'] = durata;
        this.nftmodel['price']=res.price;
        this.image();
      });
    });

    this.createEventSource();

  }

  ngAfterViewInit(): void {
    const checkInterval = 1000;
    this.intervalSubscription = interval(checkInterval).subscribe(() => {
      this.checkduration();
    });
  }


  checkduration(){
    const nftId = this.nftservice.getnftid() ?? '';
    this.nftservice.getsaletabel(nftId).subscribe(res=>{
      this.nftmodel['price']=res.price;

      const temponow = new Date().toString();
      const secondsRemaining = this.calcolaDifferenzaTraTimestamp(temponow, res.endTime);
      this.astas.addAuction(res.nftId, secondsRemaining);
      this.astas.getTimeRemaining(res.nftId).subscribe(timeRemaining => {
      const durata = this.formatSecondsToTime(timeRemaining);
      this.nftmodel['durata'] = durata;
      })
      // let durata = this.formatSecondsToTime(this.calcolaDifferenzaTraTimestamp(res.creationDate ,res.endTime));
      const endtime= new Date(res.endTime);
      const currentTime = new Date();
      console.log(endtime, currentTime, res.offerMaker)
      if(endtime <= currentTime && res.offerMaker!=null){
        this.route.navigate(['/end-auction'])
        this.intervalSubscription.unsubscribe();
      }
    if(endtime <= currentTime && res.offerMaker==null){
        this.route.navigate(['/home'])
        this.intervalSubscription.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    console.log('distrutto')
    this.eventSource?.close();
  }

  image() {
    const id = this.nftservice.getnftid() ?? '';

    this.nftservice.getImage(id).subscribe(
      (data: ArrayBuffer) => {
        const uint8Array = new Uint8Array(data);
        const byteCharacters = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const imageUrl = 'data:image/png;base64,' + btoa(byteCharacters);
        this.imageUrl = imageUrl;
      },
      (error) => {
        console.error('Errore durante il recupero dell\'immagine', error);
      }
    );
  }

  makeoffer(){
    const nftId = this.nftservice.getnftid() ?? '';
    this.nftservice.getsaletabel(this.idsale).subscribe(res=>{
      this.auth.getwallet().subscribe((data: any[]) => {
        this.alladdress = data;
        if (this.selectedPaymentMethod=='USD'){
          for (let el of this.alladdress){
            if(el.type==1 && el.balance!=0){
              this.address= el.address;
            }
          }
        }
        if (this.selectedPaymentMethod=='ETH'){
          for (let el of this.alladdress){
            if(el.type==0 && el.balance!=0){
              this.address= el.address;
            }
          }
        }
        const offer = parseInt(this.offerta, 10);
        this.nftservice.offer(nftId, {address: this.address, offer})
      });
      })
    
  }

  report(){
    const id = this.nftservice.getnftid() ?? '';
    this.nftservice.reportnft(id);
  }


}








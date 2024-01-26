import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-buy-nft-auction',
  templateUrl: './buy-nft-auction.component.html',
  styleUrl: './buy-nft-auction.component.css'
})
export class BuyNftAuctionComponent {
  nftmodel!: any;
  imageUrl: any;
  idsale!: any;
  address!: any;
  paymentMethods: string[] = ['USD', 'ETH'];
  selectedPaymentMethod: string = '';

  constructor(private nftservice : NFTService, private auth : AuthService){}

  calcolaDifferenzaTraTimestamp(timestamp1: string, timestamp2: string): number {
    const data1 = new Date(timestamp1);
    const data2 = new Date(timestamp2);

    const differenzaInMillisecondi = data2.getTime() - data1.getTime();
    const differenzaInSecondi = differenzaInMillisecondi / 1000;

    return differenzaInSecondi;
  }

  formatSecondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursString = String(hours).padStart(2, '0');
    const minutesString = String(minutes).padStart(2, '0');
    const secondsString = String(remainingSeconds).padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}`;
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

  // compra(){
  //   this.nftservice.getsaletabel(this.idsale).subscribe(res=>{
  //     this.auth.getwallet().subscribe((data: any[]) => {
  //       this.address = data.map(item => item.address)[0];
  //       this.nftservice.buyNFT(res.id, {idNft : this.nftservice.getnftid() ?? '', address: this.address, price : res.price})
  //     });

  //   })
  // }

  report(){
    const id = this.nftservice.getnftid() ?? '';
    this.nftservice.reportnft(id, {});
  }


}








import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';

@Component({
  selector: 'app-buy-nft-now',
  templateUrl: './buy-nft-now.component.html',
  styleUrl: './buy-nft-now.component.css'
})
export class BuyNftNowComponent implements OnInit{

  nftmodel!: any;
  imageUrl: any;
  
  
  constructor(private nftservice : NFTService){}

  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid() ?? '').subscribe(data =>{
      
      this.nftservice.getsaletabel(data.id).subscribe(res=>{
        this.nftmodel= data;
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

  compra(){}

  

}

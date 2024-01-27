import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NFTService } from '../../nft.service';

@Component({
  selector: 'app-end-auction',
  templateUrl: './end-auction.component.html',
  styleUrl: './end-auction.component.css'
})
export class EndAuctionComponent {
  nft!: any;
  imageUrl: any;
  idsale!: any;
  address!: any;

  constructor(private nftservice : NFTService, private auth : AuthService){}

  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid() ?? '').subscribe(data =>{

      this.nftservice.getsaletabel(data.id).subscribe(res=>{
        this.idsale=data.id;
        this.nft= data;
        this.nft['offer_maker']=res.offerMaker;
        this.nft['price']=res.price;
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

}

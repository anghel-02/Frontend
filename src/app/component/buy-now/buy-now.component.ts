import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import {Router} from "@angular/router";
import {NFTService} from "../../nft.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrl: './buy-now.component.css',
  animations: [
    trigger('hoverState', [
      state('hovered', style({
        transform: 'scale(1.1)',
      })),
    ]),
  ],
})
export class BuyNowComponent implements OnInit {



  constructor(private router: Router, private nftService: NFTService, private auth: AuthService) {}
  

  hoverState = 'initial';
  saleNFTs: any[] = [];
  noNFT: any;
  

  onTileHover() {
    this.hoverState = (this.hoverState === 'initial') ? 'hovered' : 'initial';
  }

  

  ngOnInit(): void {
   this.viewnft();
  }

  image(nft: any) {
    this.nftService.getImage(nft.id).subscribe(
      (data: ArrayBuffer) => {
        const uint8Array = new Uint8Array(data);
        const byteCharacters = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const imageUrl = 'data:image/png;base64,' + btoa(byteCharacters);
        nft.imageUrl = imageUrl;
      },
      (error) => {
        console.error('Errore durante il recupero dell\'immagine', error);
      }
    );
  }

    viewnft(){
      this.nftService.getSales().subscribe(data=> {
        console.log(data);
        // for (let element of data){
        //   if (data[element].end_time==null){
        //     this.saleNFTs.push(data[element]);
        //   }
        // }
        // for (let el of this.saleNFTs){
        //   this.image(el);
        // }
      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      })
    }

    info(nftid: string){
      this.nftService.setnftid(nftid);
      this.router.navigate(['/buy-nft-now'])
    }


}

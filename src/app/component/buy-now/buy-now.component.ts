import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import {Router} from "@angular/router";
import {NFTService} from "../../nft.service";
import {AuthService} from "../../auth.service";
import {SearchService} from "../../search.service";

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


  constructor(private router: Router, private nftService: NFTService, private auth: AuthService, private searchService: SearchService) {
    this.searchService.searchSubject.subscribe((search: string) => {
      this.filterNFTs(search);
    });
  }

  hoverState = 'initial';
  saleNFTs: any[] = [];
  noNFT: any;
  imageUrl!: string;
  allNFTs: any[] = [];


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
  filterNFTs(search: string) {
    if (!search || search.trim() === '') {
      this.saleNFTs = [...this.allNFTs];
    } else {
      this.saleNFTs= this.allNFTs.filter((nft) => nft.title.toLowerCase().includes(search.toLowerCase()));
    }
  }

    viewnft(){
      this.nftService.getSales().subscribe(data=> {

        for (let element of data){
          this.nftService.getsaletabel(element.id).subscribe(res=>{
            if (!res.endTime){
              element['price']=res.price;
              this.allNFTs.push(element);
              this.saleNFTs.push(element);
            }

            for (let el of this.saleNFTs){
              this.image(el);
            }
          })
        }

      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      })
    }

    info(nftid: string){
      this.nftService.setnftid(nftid);
      this.router.navigate(['/buy-nft-now'],{ queryParams: { nftid: nftid } })
    }


}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import {Router} from "@angular/router";
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import {SearchService} from "../../search.service";

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
  animations: [
    trigger('hoverState', [
      state('hovered', style({
        transform: 'scale(1.1)',
      })),
    ]),
  ],
})
export class AuctionsComponent implements OnInit , AfterViewInit{
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
  ngAfterViewInit(): void {
    this.viewnft();
  }
  ngOnInit(): void {
  }
  filterNFTs(search: string) {
    if (!search || search.trim() === '') {
      this.saleNFTs = [...this.allNFTs];
    } else {
      this.saleNFTs= this.allNFTs.filter((nft) => nft.title.toLowerCase().includes(search.toLowerCase()));
    }
  }

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

        for (let element of data){
          this.nftService.getsaletabel(element.id).subscribe(res=>{
            if (res.endTime){
              let durata = this.formatSecondsToTime(this.calcolaDifferenzaTraTimestamp(res.creationDate ,res.endTime));
              console.log(durata)
              element['durata'] = durata;
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
      this.router.navigate(['/buy-nft-auction'],{ queryParams: { nftid: nftid } })
    }


}

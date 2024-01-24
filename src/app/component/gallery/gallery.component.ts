import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {SearchService} from "../../search.service";



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements AfterViewInit{
  ownedNFTs: any[] = [];
  saleNFT: any[] = [];
  imageUrl!: string;
  bool = true;
  allNFTs: any[] = [];

  constructor(private nftService: NFTService, private auth: AuthService, private router: Router, private searchService: SearchService) {
    this.searchService.searchSubject.subscribe((search: string) => {
      this.filterNFTs(search);
    });
  }

    ngAfterViewInit(): void {
      this.loadOwnedNFTs();
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
    console.log('Before filter:', this.ownedNFTs);

    if (!search || search.trim() === '') {
      // Se la stringa di ricerca è vuota, reimposta la lista degli NFT posseduti
      this.ownedNFTs = [...this.allNFTs];
    } else {
      // Filtra gli NFT in base al titolo
      this.ownedNFTs = this.allNFTs.filter((nft) => nft.title.toLowerCase().includes(search.toLowerCase()));
    }

    console.log('After filter:', this.ownedNFTs);
  }


  loadOwnedNFTs() {
    const username = this.auth.getUsername() ?? '';
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.nftService.getSales().subscribe((resp: any[]) =>{
          this.saleNFT = resp
          console.log(this.saleNFT)

          for (let el of data){
            this.bool = true;
            for (let ele of this.saleNFT){
              if (el.id==ele.id){
                this.bool= false
              }
            }
            if(this.bool){
              this.allNFTs.push(el)
              this.ownedNFTs.push(el)
            }
          }
          console.log(this.ownedNFTs)
          for (let el of this.ownedNFTs){
            this.image(el);
          }
        })

      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      }
    );
  }

  info(nftid: string){
    this.nftService.setnftid(nftid);
    this.router.navigate(['/nft'], { queryParams: { nftid: nftid } })
  }

}

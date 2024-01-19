import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";
import {SearchService} from "../../search.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  ownedNFTs: any[] = [];
  imageUrl!: any;
  filteredNfts: any[] = [];

  constructor(private nftService: NFTService, private auth: AuthService, private router: Router, private searchService: SearchService) {}

  ngOnInit() {
    this.loadOwnedNFTs();
    this.image();
    
    this.searchService.searchSubject.subscribe(search => {
      this.filteredNfts = this.ownedNFTs.filter(nft => nft.title.includes(search));
    });
  }
  updateSearch(value: string) {
    this.filteredNfts = this.ownedNFTs.filter(nft => nft.title.includes(value));
  }

  loadOwnedNFTs() {
    const username= this.auth.getUsername();
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.ownedNFTs = data;
      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      }
    );
  }

  image(id : string) {
    
    this.nftService.getImage(id).subscribe(
      (data: ArrayBuffer) => {
        const base64Image = btoa(String.fromCharCode(...new Uint8Array(data)));;
        this.imageUrl = 'data:image/jpeg;base64,' + base64Image;
      },
      (error) => {
        console.error('Errore durante il recupero dell\'immagine', error);

        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            console.error('Immagine non trovata. Verifica il percorso e il nome del file.');
          } else {
            console.error(`Errore ${error.status}: ${error.statusText}`);
          }
        } else {
          console.error('Errore sconosciuto:', error);
        }
      }
    );
  }
  info(nftid: string){
    this.nftService.setnftid(nftid);
    this.router.navigate(['/nft'])
  }

}



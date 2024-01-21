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
export class GalleryComponent implements OnInit , AfterViewInit{
  ownedNFTs: any[] = [];
  imageUrl!: string;
  filteredNfts: any[] = [];

  constructor(private nftService: NFTService, private auth: AuthService, private router: Router, private searchService: SearchService) {}
 
 
    ngAfterViewInit(): void {
      this.loadOwnedNFTs();
    }
  

    ngOnInit() {}
  
  loadOwnedNFTs() {
    const username = this.auth.getUsername() ?? '';
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.ownedNFTs = data;
        for (let el of this.ownedNFTs){
          this.image(el.id);
        }

      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      }
    );

    this.nftService.getSales().subscribe(data =>{
      console.log('Dati ricevuti:', data);
  }, error => {
      console.error('Errore durante la chiamata:', error);
      
  })
  }

  image(id : string) {
    
    this.nftService.getImage(id).subscribe(
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
  info(nftid: string){
    this.nftService.setnftid(nftid);
    this.router.navigate(['/nft'])
  }

}



















import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  ownedNFTs: any[] = [];
  imageUrl!: any;

  constructor(private nftService: NFTService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadOwnedNFTs();
  }

  loadOwnedNFTs() {
    const username= this.auth.getUsername();
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.ownedNFTs = data;
        for (let element of this.ownedNFTs){
          this.image(element.id);
        }
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



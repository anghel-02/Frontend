import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  ownedNFTs: any[] = [];

  constructor(private nftService: NFTService) {}

  ngOnInit() {
    this.loadOwnedNFTs();
  }

  loadOwnedNFTs() {
    const username: string = 'nome_utente';
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.ownedNFTs = data;
        console.log('NFT posseduti:', this.ownedNFTs);
      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      }
    );
  }


}

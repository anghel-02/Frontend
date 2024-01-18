import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  ownedNFTs: any[] = [];
  id!: string;
  imageUrl!: string;

  constructor(private nftService: NFTService, private auth: AuthService) {}

  ngOnInit() {
    this.loadOwnedNFTs();
    this.image();
  }

  loadOwnedNFTs() {
    const username= this.auth.getUsername();
    this.nftService.getOwnedNFTs(username).subscribe(
      (data: any[]) => {
        this.ownedNFTs = data.map(nft =>{
          this.id= nft.id;
        })
        console.log('NFT posseduti:', this.ownedNFTs);
      },
      (error: any) => {
        console.error('Errore nel recupero degli NFT posseduti', error);
      }
    );
  }

  image(){
    this.nftService.getImage(this.id).subscribe((imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(imageBlob);
    });
  }


}

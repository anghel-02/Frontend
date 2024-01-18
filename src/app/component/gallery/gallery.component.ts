import { Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

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
    this.image();
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

  image(){
    const img = "download.png";

    this.nftService.getImage(img).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(data);
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



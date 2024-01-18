import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { Nftmodel } from '../../model/nftmodel';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})

export class NftComponent implements OnInit{
    tipovendita!:string;
    vuoivendere: boolean = false;
    nftmodel!: Nftmodel;
    imageUrl!: any;


    constructor(private nftservice: NFTService){}
  
    ngOnInit(): void {
      this.nftservice.getdbnft(this.nftservice.getnftid()).subscribe(data =>{
        this.nftmodel= data;
      })
      this.image();
    }

    image(){
      const img = "download.png";
  
      this.nftservice.getImage(img).subscribe(
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
    
    mettiinvendita(){
      this.vuoivendere= this.vuoivendere ? false : true;
    }

    

    
}

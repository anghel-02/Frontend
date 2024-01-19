import { Time } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { Nftmodel } from '../../model/nftmodel';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})

export class NftComponent implements OnInit, AfterViewInit{
    tipovendita!:string;
    vuoivendere: boolean = false;
    nftmodel!: any;
    imageUrl: string | undefined;

    prezzobuynow! : number;
    prezzoauction! : number;
    datavendita! : Time;
    fineasta! : Time;
    price! : number; 
    wallet: any[]= [];

    constructor(private nftservice: NFTService, private auth: AuthService){}
  
    ngAfterViewInit(): void {
      this.image();
    }
  
    ngOnInit(): void {
      this.nftservice.getdbnft(this.nftservice.getnftid()).subscribe(data =>{
        this.nftmodel= data;
      })
      
    }

    image() {
      const id = this.nftservice.getnftid();
    
      this.nftservice.getImage(id).subscribe(
        (data: ArrayBuffer) => {
          this.imageUrl = 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(data)));
        },
        (error) => {
          console.error('Errore durante il recupero dell\'immagine', error);
        }
      );
    }
    
    mettiinvendita(){
      this.vuoivendere= this.vuoivendere ? false : true;
    }

    vendi(){
      const nft_id = this.nftservice.getnftid();

      if(this.prezzobuynow!=null){
        this.price = this.prezzobuynow;
      }
      else{
        this.price = this.prezzoauction;
      }
      
      const creation_date = this.datavendita;
      const end_time = this.fineasta;

      this.auth.getwallet().subscribe((data: any[]) => {
        this.wallet = data.map(item => item.address);
        const destination_address = this.wallet[0];
        this.nftservice.vendinft({nft_id, destination_address, price: this.price,creation_date, end_time})
     });
      
    }

    

    
}

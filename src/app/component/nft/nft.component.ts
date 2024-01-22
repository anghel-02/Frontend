import {Component, OnInit } from '@angular/core';
import { NFTService } from '../../nft.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})

export class NftComponent implements OnInit{
  tipovendita!:string;
  vuoivendere: boolean = false;
  nftmodel!: any;
  imageUrl: any;

  fineasta! : number;
  price! : number;
  wallet!: string;

  constructor(private nftservice: NFTService, private auth: AuthService, private route: Router){}


  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid() ?? '').subscribe(data =>{
      this.nftmodel= data;
      this.image();
    })

  }

    image() {
      const id = this.nftservice.getnftid() ?? '';

      this.nftservice.getImage(id).subscribe(
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
    mettiinvendita(){
      this.vuoivendere= this.vuoivendere ? false : true;
    }


    vendi() {
      let idNft = this.nftservice.getnftid();
      let price = this.price;
      let duration = this.fineasta;

      this.auth.getwallet().subscribe((data: any[]) => {
        let destinationAddress = data.map(item => item.address)[0];
        this.nftservice.addSale({idNft,price, destinationAddress, duration })
      });

      this.route.navigate(['home']);
    }

    }

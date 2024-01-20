import { Time } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { Nftmodel } from '../../model/nftmodel';
import { AuthService } from '../../auth.service';
import {type} from "os";
import {error} from "@angular/compiler-cli/src/transformers/util";


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

  prezzobuynow! : number;
  prezzoauction! : number;
  datavendita! : Time;
  fineasta! : Time;
  price! : number;
  wallet: any[]= [];

  constructor(private nftservice: NFTService){
    this.nftmodel = {};
  }

  
  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid()).subscribe(data =>{
      this.nftmodel= data;
      this.image();
    })

  }
  
    image() {
      const id = this.nftservice.getnftid();

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
      let nftId = this.nftmodel.id; // ID dell'NFT
      let price = this.price; // Prezzo
      let type = this.tipovendita; // Tipo di vendita
  
      console.log('nftId:', nftId);
      console.log('price:', price);
      console.log('type:', type);
  
      this.nftservice.addSale(nftId, price, type).subscribe(
        (data) => {
          console.log('Vendita creata con successo:', data);
        },
        (error) => {
          console.error('Errore durante la creazione della vendita', error);
        }
      );
    }
      
    }







    

    




    


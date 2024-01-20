import { Time } from '@angular/common';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NFTService } from '../../nft.service';
import { Nftmodel } from '../../model/nftmodel';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})

export class NftComponent implements OnInit{

  @Output() nftVenduto = new EventEmitter<string>();

  prezzo!: number;
  inizio!: string;
  durata!: string;

  tipovendita!:string;
  vuoivendere: boolean = false;
  nftmodel!: any;
  imageUrl!: any;

  constructor(private nftservice: NFTService){
    this.nftmodel = {};
  }

  ngOnInit(): void {
    this.nftservice.getdbnft(this.nftservice.getnftid()).subscribe(data =>{
      this.nftmodel= data;
    })
    this.image();
  }
  vendi() {
    let nftId = this.nftmodel.id; // ID dell'NFT
    let price = this.prezzo; // Prezzo
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

import { Time } from "@angular/common";


export interface Nftmodel {
    nome: string;
    tag: string;
    img: string;
    descrizione: string;
    possessore: string;
    autore: string;
    tipovendita:string;
    prezzo: number;
    durata: Time;
}

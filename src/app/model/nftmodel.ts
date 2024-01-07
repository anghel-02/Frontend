import { Time } from "@angular/common";


export interface Nftmodel {
    nome: string;
    tag: string;
    img: string;
    descrizione: string;
    possessore: string;
    tipovendita:string;
    prezzo: number;
    durata: Time;
    offertaattuale: number;
    valuta: string;
}

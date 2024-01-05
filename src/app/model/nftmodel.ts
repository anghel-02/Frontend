import { Time } from "@angular/common";

enum compraoraAsta{
    compraora,
    asta
}

export interface Nftmodel {
    nome: string;
    tag: string;
    img: string;
    descrizione: string;
    possessore: string;
    tipovendita:compraoraAsta;
    prezzo: string;
    durata: Time;
    offertaattuale: string;
}

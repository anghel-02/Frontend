import { Time } from "@angular/common";

enum compraoraAsta{
    compraora,
    asta
}

export interface Nftmodel {
    nome: string;
    img: string;
    descrizione: string;
    tag: string;
    possessore: string;
    invendita: boolean;
    tipovendita:compraoraAsta;
    prezzo: string;
    durata: Time;
    offertaattuale: string;
}

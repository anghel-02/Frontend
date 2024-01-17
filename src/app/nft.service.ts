import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NFTService {
  private url = "http://localhost:9001/";


  constructor(private http: HttpClient) {}

  getOwnedNFTs(username: string): Observable<any[]> {
    return this.http.post<any[]>(this.url + "nft/find", username).pipe(
      tap((data) => console.log('Dati ottenuti con successo:', data)),
      catchError((error) => {
        console.error('Errore durante il recupero degli NFT posseduti', error);
        throw error;
      })
    );
  }

}

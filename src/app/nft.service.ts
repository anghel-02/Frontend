import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NFTService {
  private baseUrl = '/api';


  constructor(private http: HttpClient) {}

  getOwnedNFTs(username: string): Observable<any[]> {
    const url = `${this.baseUrl}/nft/find?owner=${username}`;
    return this.http.get<any[]>(url).pipe(
      tap((data) => console.log('Dati ottenuti con successo:', data)),
      catchError((error) => {
        console.error('Errore durante il recupero degli NFT posseduti', error);
        throw error;
      })
    );
  }

}

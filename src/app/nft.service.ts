import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NFTService {
  private url = "http://localhost:9001/";

  constructor(private http: HttpClient, private auth: AuthService) {}

  getOwnedNFTs(username: string): Observable<any[]> {
    const authToken = this.auth.getToken();
    const findParams = {
      owner: username
    };
    return this.http.post<any[]>(this.url + "nft/find", findParams,{
      headers:{
        "Authorization" : `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }}).pipe(
      tap((data) => console.log('Dati ottenuti con successo:', data)),
      catchError((error) => {
        console.error('Errore durante il recupero degli NFT posseduti', error);
        throw error;
      })
    );
  }

  getImage(id: string): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json'
    };

    return this.http.get<Blob>(this.url + `nft/get/${id}/image`, options).pipe(
      catchError((error) => {
        console.error('Errore durante il recupero dell\'immagine', error);
        throw error;
      })
    );
  }

}



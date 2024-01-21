import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {catchError, Observable, tap} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NFTService {
  private url = "http://localhost:9001/";
  idnft!: string;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getnftid(){
    return this.idnft;
  }

  setnftid(idnft: string){
    this.idnft = idnft;
  }

  getOwnedNFTs(username: string): Observable<any[]> {
    const authToken = this.auth.getToken();
    const findParams = {
      owner: username,
      onSale: true
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
  getSales(username: string): Observable<any[]> {
    const authToken = this.auth.getToken();

    return this.http.post<any[]>(this.url + "nft/find",{
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
  addSale(body :{}) {
    const authToken = this.auth.getToken();
    this.http.put<any>(this.url + "sale/create", body, {
      headers:{
        "Authorization" : `Bearer ${authToken}`
      }}).subscribe(response =>{
        this.auth.setToken(response.token);
      })
  }



  getdbnft(id : string): Observable<any>{
    return this.http.get<any>(this.url + `nft/get/${id}`)
  }

  
  getImage(id: string): Observable<any> {
    return this.http.get(this.url + `nft/get/${id}/image`, { responseType: 'arraybuffer' });
  }

   createNFT( body: {}){
    const authToken = this.auth.getToken();
    this.http.put<any>(this.url + "nft/create", body, {
      headers:{
        "Authorization" : `Bearer ${authToken}`
      }
    }).subscribe(response =>{
      this.auth.setToken(response.token);
    })

  }



}













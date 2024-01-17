import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:9001/";
  public token?:string | null;
  private usernameglobal : string = "";


  constructor(private http: HttpClient, private route: Router) {

  }

  setUsername(username: string): void {
    this.usernameglobal = username;
  }

  getUsername(): string {
    return this.usernameglobal;
  }

  getToken(){
    if (this.token !== undefined){
      this.token = localStorage.getItem("AuthToken");
    }
    console.log(this.token);
    return this.token;
  }

  setToken(token:string){
    this.token = token;
    localStorage.setItem("AuthToken", token);

  }

  removeToken(){
    this.token = undefined;
    localStorage.removeItem("AuthToken");
  }

  signup(body: {}): Observable<any> {
    return this.http.put(this.url + "user/register", body);
  }

  updateuser(body: {}){
    const authToken = this.getToken();
    this.http.put<any>(this.url + "user/update", body,{
      headers:{
        "Authorization" : `Bearer ${authToken}`
      }
    }).subscribe(response =>{
      this.setToken(response.token);
    })
  }

  createNFT( formData: FormData){
    const authToken = this.getToken();
    this.http.put<any>(this.url + "nft/create", formData, {
      headers:{
        "Authorization" : `Bearer ${authToken}`
      }
    }).subscribe(response =>{
      this.setToken(response.token);
    })
      
  }

  
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}user/get/${username}`) 
  }


  login(username: string, password: string){
    const basicToken = btoa (username + ':' + password);
    this.http.get<any>(this.url + 'user/login', {
      headers: {
        "Authorization": `Basic ${basicToken}`,
      },
      withCredentials: true
    }).subscribe(response =>{
      this.setToken(response.token);
      this.route.navigate(["home"])
    })
  }

  isAuthenticated(){
    return this.getToken() != undefined;
  }


}





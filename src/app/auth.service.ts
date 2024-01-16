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


  constructor(private http: HttpClient, private route: Router) {

  }

  getToken(){
    if (this.token !== undefined){
      this.token = localStorage.getItem("AuthToken");
    }
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

  createNFT( body: {}){
    const authToken = this.getToken();
    this.http.put<any>(this.url + "nft/create", body, {
      headers:{
        "Authorization" : `Bearer ${authToken}`
      }
    }).subscribe(response =>{
      this.setToken(response.token);
    })
      
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





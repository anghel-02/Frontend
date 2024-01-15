import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,  Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:9001/";
  public token?:string | null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  httpOptions: { headers: HttpHeaders; } | undefined;

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(false);
  }

  getToken(){
    if (this.token == undefined){
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

  createNFT(body: {}): Observable<any> {
    return this.http.post(this.url + "nft/create", body);
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.url + 'user/login', body,{withCredentials: true})
  }
  
  isAuthenticated(){
    return this.getToken() != undefined;
  }

  
}

// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:9001';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(true);
  }

  signup(body: {}): Observable<any> {
    return this.http.post(this.url + '/user/register.json', body)
      
  }



  login(): void {
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}

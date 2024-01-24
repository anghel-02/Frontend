import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Crea un nuovo Subject per la stringa di ricerca
  searchSubject = new Subject<string>();

  constructor() { }

  updateSearch(search: string) {
    this.searchSubject.next(search);
  }
  getSearchUpdates(): Observable<string> {
    return this.searchSubject.asObservable();
  }

}

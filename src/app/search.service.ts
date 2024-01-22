import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Crea un nuovo Subject per la stringa di ricerca
  searchSubject = new Subject<string>();

  constructor() { }

  // Funzione per aggiornare la stringa di ricerca
  updateSearch(search: string) {
    this.searchSubject.next(search);
  }
}
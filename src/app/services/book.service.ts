import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../components/Book';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  /**
   * Ottiene tutti i libri dal mock.
   * @returns Un Observable che fornisce un array di libri.
   */
  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  /**
   * Aggiorna le informazioni di un libro specifico.
   * @param updatedBook Il libro aggiornato.
   * @returns Un Observable che indica l'avvenuto aggiornamento del libro.
   */
  public updateBookInfo(updatedBook: Book): Observable<any> {
    console.log('Aggiornamento libro', updatedBook);
    return this.http.put(`http://localhost:3000/books/${updatedBook.id}`, updatedBook);
  }
}

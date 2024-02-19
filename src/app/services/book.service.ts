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
    return this.http.put(`http://localhost:3000/books/${updatedBook.id}`, updatedBook);
  }

  /**
   * Effettua una richiesta HTTP di tipo POST per effettuare la creazione
   * di un nuovo libro.
   * @param addBook è il libro creato.
   * @returns Un Observable che indica l'avvenuta creazione del libro.
   */
  public createdBook(addBook: Book):Observable<any>{
    console.log("Service Created:");
    return this.http.post('http://localhost:3000/books', addBook);
  }

  /**
   * Metodo per la cancellazione del libro.
   */
  public deleteBook(deleteBook: Book):Observable<any>{
    console.log("Service: ",deleteBook);
    return this.http.delete(`http://localhost:3000/books/${deleteBook.id}`);
  }

}

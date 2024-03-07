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
   * Retrieves all books from the mock server.
   * @returns An Observable that provides an array of books.
   */
  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  /**
   * Updates the information of a specific book.
   * @param updatedBook The updated book.
   * @returns An Observable indicating the successful update of the book.
   */
  public updateBookInfo(updatedBook: Book): Observable<any> {
    return this.http.put(`http://localhost:3000/books/${updatedBook.id}`, updatedBook);
  }

  /**
   * Sends an HTTP POST request to create a new book.
   * @param addBook The book to be created.
   * @returns An Observable indicating the successful creation of the book.
   */
  public createdBook(addBook: Book): Observable<any> {
    console.log("Service Created:");
    return this.http.post('http://localhost:3000/books', addBook);
  }

  /**
   * Method for deleting the book.
   * @param deleteBook The book to be deleted.
   * @returns An Observable indicating the successful deletion of the book.
   */
  public deleteBook(deleteBook: Book): Observable<any> {
    console.log("Service: ", deleteBook);
    return this.http.delete(`http://localhost:3000/books/${deleteBook.id}`);
  }
}

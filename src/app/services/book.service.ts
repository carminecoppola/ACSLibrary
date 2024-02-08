import { Injectable } from '@angular/core';
import { Book } from "../components/Book";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

/**
 * Servizio per la gestione dei libri.
 */

@Injectable({
  providedIn: 'root'
})

export class BookService {

  // Libro attualmente in fase di modifica
  editingBook: Book | undefined;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Ottiene tutti i libri dal mock.
   * @returns Un Observable che ci fornisce un array di libri.
   * //Guarda il concetto di any
   */
  getBooks(): Observable<any> {
    return this.http.get('http://localhost:3000/books');
  }



  /**
   * Imposta il libro in fase di modifica in base al codice ISBM.
   * @param codISBN Il codice ISBM del libro da impostare in fase di modifica.

  setEditingBookByCodISBN(codISBN: number) {
    this.editingBook = this.getBook().find(book => book.codISBN === codISBN);
  }

  /**
   * Avvia la modifica di un libro in base al suo ID.
   * @param bookId L'ID del libro da modificare.
   * @returns Il libro che è stato avviato per la modifica, se presente.

  editBook(bookId: number): Book | undefined {
    console.log(`Editing book with ID: ${bookId}`);
    const bookToEdit = this.getBook().find(book => book.codISBN === bookId);
    if (bookToEdit) {
      this.editingBook = bookToEdit;
    }
    return bookToEdit;
  }


  /**
   * Aggiorna un libro con le informazioni fornite.
   * @param updatedBook Il libro aggiornato.

  updateBook(updatedBook: Book): void {
    const index = this.getBook().findIndex(book => book.codISBN === updatedBook.codISBN);
    if (index !== -1) {
      BOOKS[index] = updatedBook;
    }
    this.onEditComplete();
  }

  /**
   * Metodo chiamato quando si completa la modifica del libro.
   * Nasconde il form di modifica.

  onEditComplete() {
    this.editingBook = undefined;
  }

   */

  /**
   * Aggiunge un nuovo libro alla lista.
   * @param newBook Il nuovo libro da aggiungere.
   */
  addBook(newBook: Book): void {
    newBook.codISBN = this.generateNewCodISBN();
    //BOOKS.push(newBook);
  }

  /**
   * Genera un nuovo codice ISBM in modo casuale.
   * @returns Un nuovo codice ISBM.
   */
  private generateNewCodISBN(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }
}



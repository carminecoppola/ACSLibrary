import { Injectable } from '@angular/core';
import { Book } from "../components/Book";
import { BOOKS } from "../mock/mockBook";

/**
 * Servizio per la gestione dei libri.
 */
@Injectable({
  providedIn: 'root'
})
export class BookService {

  // Libro attualmente in fase di modifica
  editingBook: Book | undefined;

  constructor() { }

  /**
   * Ottiene tutti i libri dal mock.
   * @returns Un array di libri.
   */
  getBook(): Book[] {
    return BOOKS;
  }

  /**
   * Imposta il libro in fase di modifica in base al codice ISBM.
   * @param codISBM Il codice ISBM del libro da impostare in fase di modifica.
   */
  setEditingBookByCodISBM(codISBM: number) {
    this.editingBook = this.getBook().find(book => book.codISBM === codISBM);
  }

  /**
   * Avvia la modifica di un libro in base al suo ID.
   * @param bookId L'ID del libro da modificare.
   * @returns Il libro che è stato avviato per la modifica, se presente.
   */
  editBook(bookId: number): Book | undefined {
    console.log(`Editing book with ID: ${bookId}`);
    const bookToEdit = this.getBook().find(book => book.codISBM === bookId);
    if (bookToEdit) {
      this.editingBook = bookToEdit;
    }
    return bookToEdit;
  }

  /**
   * Elimina un libro in base al suo ID.
   * @param bookId è l'ID del libro da eliminare.
   */
  deleteBook(bookId: number): void {
    console.log(`Deleting book with ID: ${bookId}`);
    const index = this.getBook().findIndex(book => book.codISBM === bookId);
    if (index !== -1) {
      BOOKS.splice(index, 1);
    }
  }

  /**
   * Aggiorna un libro con le informazioni fornite.
   * @param updatedBook Il libro aggiornato.
   */
  updateBook(updatedBook: Book): void {
    const index = this.getBook().findIndex(book => book.codISBM === updatedBook.codISBM);
    if (index !== -1) {
      BOOKS[index] = updatedBook;
    }
    this.onEditComplete();
  }

  /**
   * Metodo chiamato quando si completa la modifica del libro.
   * Nasconde il form di modifica.
   */
  onEditComplete() {
    this.editingBook = undefined;
  }

  /**
   * Aggiunge un nuovo libro alla lista.
   * @param newBook Il nuovo libro da aggiungere.
   */
  addBook(newBook: Book): void {
    newBook.codISBM = this.generateNewCodISBM();
    BOOKS.push(newBook);
  }

  /**
   * Genera un nuovo codice ISBM in modo casuale.
   * @returns Un nuovo codice ISBM.
   */
  private generateNewCodISBM(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }
}

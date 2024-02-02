import { Injectable } from '@angular/core';
import { Book } from "../components/Book";
import { BOOKS } from "../mock/mockBook";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  editingBook: Book | undefined;

  constructor() { }

  // Mi richiamo direttamente l'array BOOKS nel mio mock
  getBook(): Book[] {
    return BOOKS;
  }

  // Metodo per modificare i dati del libro
  editBook(bookId: number): Book | undefined {
    console.log(`Editing book with ID: ${bookId}`);
    const bookToEdit = this.getBook().find(book => book.codISBM === bookId);
    if (bookToEdit) {
      // Visualizza il form di modifica con le informazioni del libro
      this.editingBook = bookToEdit;
    }
    return bookToEdit;
  }

  // Metodo per cancellare il libro
  deleteBook(bookId: number): void {
    console.log(`Deleting book with ID: ${bookId}`);
    // Implementa la logica di eliminazione del libro
    const index = this.getBook().findIndex(book => book.codISBM === bookId);
    if (index !== -1) {
      BOOKS.splice(index, 1);
    }
    // Aggiorna la lista dei libri dopo l'eliminazione
  }

  // Metodo chiamato quando si completa la modifica del libro
  onEditComplete() {
    // Nascondi il form di modifica
    this.editingBook = undefined;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";

/**
 * Componente principale per la visualizzazione della lista dei libri.
 */
@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  title = 'LibraryProject';

  // Array di stringhe che rappresentano le colonne da visualizzare nella tabella
  displayedColumns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action'];

  // Array contenente tutti i libri
  allBooks: Book[] = [];

  // Variabile per tenere traccia del libro attualmente in fase di modifica
  editingBook: Book | undefined;

  // Variabile per mostrare/nascondere il messaggio di successo
  showSuccessMessage: boolean = false;

  /**
   * Costruttore del componente.
   * @param bookService Servizio per la gestione dei libri
   * @param authService Servizio per l'autenticazione
   * @param router Oggetto per la navigazione tra le pagine
   */
  constructor(private bookService: BookService, private authService: AuthServiceService, private router: Router) {}

  /**
   * Metodo chiamato all'inizializzazione del componente.
   * Richiama il metodo per ottenere tutti i libri.
   */
  ngOnInit() {
    this.getAllBooks();
    this.editingBook = this.bookService.editingBook;
  }

  /**
   * Ottiene tutti i libri dal servizio e aggiorna la lista locale.
   */
  getAllBooks() {
    console.log('List of Books');
    this.allBooks = this.bookService.getBook();
    console.log(this.allBooks);
  }

  /**
   * Avvia la modifica di un libro, impostando il libro corrente nel servizio e navigando alla pagina di modifica.
   * @param codISBM Codice ISBM del libro da modificare
   */
  editBook(codISBM: number) {
    // Aggiorna il libro attualmente in fase di modifica nel servizio
    this.bookService.setEditingBookByCodISBM(codISBM);

    // Naviga alla pagina di modifica includendo il codice ISBM come parametro nella query dell'URL
    this.router.navigate(['/ebook'], {queryParams: {codISBM: codISBM}});

  }

  /**
   * Elimina un libro utilizzando il servizio.
   * @param bookId Identificativo del libro da eliminare
   */
  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId);
  }

  /**
   * Aggiunge un nuovo libro utilizzando il servizio.
   * Stampa anche un messaggio di successo e aggiorna la lista dopo l'aggiunta.
   */
  addNewBook() {
    console.log("Sono entrato");
    const newBook: Book = {
      codISBM: 0, // Sarà assegnato dal servizio prima dell'aggiunta
      title: 'New Book',
      author: 'Author',
      dateOfPublication: '2024-02-05', // Aggiungi la data corretta
      genre: 'Genre'
    };
    console.log("Questo è il nuovo libro", newBook);
    this.bookService.addBook(newBook);
    this.getAllBooks(); // Aggiorna la lista dopo l'aggiunta
    this.showSuccessMessage = true; // Mostra il messaggio di successo
  }
}

/**
 * Componente principale per la visualizzazione della lista dei libri.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../Book';
import { Subscription } from 'rxjs';
import { PageStatus } from '../pageStatus';
import {MatDialogRef} from "@angular/material/dialog";
import {DeleteBookComponent} from "../delate-book/delete-book.component";

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy {

  // Array di stringhe che rappresentano le colonne da visualizzare nella tabella
  displayedColumns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action'];

  allBooks: Book[] = [];

  // Variabile per capire quando è stata effettuata la subscription
  subscription: Subscription | null = null;

  // Variabile per lo stato della pagina
  public pageStatus: PageStatus = PageStatus.loading; // Inizializzo a loading

  /**
   * Costruttore del componente.
   * @param bookService Servizio per la gestione dei libri
   * @param authService Servizio per l'autenticazione
   * @param router Oggetto per la navigazione tra le pagine
   */
  constructor(
    private bookService: BookService,
    private authService: AuthServiceService,
    private router: Router,
  ) {}

  /**
   * Metodo chiamato all'inizializzazione del componente.
   * Richiama il metodo per ottenere tutti i libri.
   */
  ngOnInit() {
    this.getAllBooks();
  }

  /**
   * Metodo di distruzione del componente, serve soprattutto a terminare le subscribe.
   */
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  /**
   * Ottiene tutti i libri dal servizio e aggiorna la lista locale.
   */
  getAllBooks() {
    this.pageStatus = PageStatus.loading;

    this.subscription= this.bookService.getBooks().subscribe({
      next: (res) =>{
        this.pageStatus = PageStatus.loaded;
        this.allBooks = [...res]; // Operatore di spread
        console.log("allBooks: ", this.allBooks);

      },
      error: (err) =>{
        this.pageStatus = PageStatus.error;
        console.error("Errore in questa pagina:", this.pageStatus);
      }
    });
  }

  /**
   * Avvia la modifica di un libro, impostando il libro corrente nel servizio e navigando alla pagina di modifica.
   * @param codISBN Il codice ISBN del libro da modificare.
   */
  editBook(codISBN: number) {
    this.router.navigate(['/edit-book'], { queryParams: { codISBN: codISBN }});
  }

  /**
   * Aggiunge un nuovo libro, navigando alla pagina di aggiunta.
   */
  addNewBook() {
    console.log("addNewBook");
    // Naviga al componente AddBookComponent solo se non sei già in esso
    this.router.navigate(['/add-book']);
  }

  /**
   * Cancella un libro.
   */
  deleteBook(codISBN: number) {
    this.router.navigate(['/delete-book'], { queryParams: { codISBN: codISBN }});
  }

  // Enum per lo stato della pagina
  protected readonly PageStatus = PageStatus;
}

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

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy {

  // Array di stringhe che rappresentano le colonne da visualizzare nella tabella
  displayedColumns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action'];

  allBooks: Book[] = [];

  // Variabile per tenere traccia del libro attualmente in fase di modifica
  editingBook: Book | undefined;

  // Variabile per mostrare/nascondere il messaggio di successo
  showSuccessMessage: boolean = false;

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
  constructor(private bookService: BookService, private authService: AuthServiceService, private router: Router) {}

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
    this.pageStatus = PageStatus.loading; // Imposto di nuovo a loading per permettere l'aggiornamento della variabile ogni volta

    this.subscription= this.bookService.getBooks().subscribe({
      next: (res) =>{
        this.pageStatus = PageStatus.loaded; // Pagina caricata correttamente
        console.log("Page Status Next: ", this.pageStatus);
        this.allBooks = [...res]; // Operatore di spread
        console.log("allBooks: ", this.allBooks);
        console.log("id libro: ", this.allBooks);

      },
      error: (err) =>{
        this.pageStatus = PageStatus.error; // Pagina in errore
        console.error("Errore in questa pagina:", this.pageStatus);
      }
    });
  }

  /**
   * Avvia la modifica di un libro, impostando il libro corrente nel servizio e navigando alla pagina di modifica.
   * @param codISBN Il codice ISBN del libro da modificare.
   */
  editBook(codISBN: number) {
    // Naviga alla pagina di modifica includendo il codice ISBN come parametro nella query dell'URL
    this.router.navigate(['/edit-book'], { queryParams: { codISBN: codISBN }});
  }

  /**
   * Aggiunge un nuovo libro utilizzando il servizio.
   * Stampa anche un messaggio di successo e aggiorna la lista dopo l'aggiunta.
   */
  addNewBook() {}

  // Enum per lo stato della pagina
  protected readonly PageStatus = PageStatus;
}

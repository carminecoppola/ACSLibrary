import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";
import { Subscription } from "rxjs";
import { PageStatus } from "../pageStatus";

/**
 * Componente principale per la visualizzazione della lista dei libri.
 */
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
    // Simula il caricamento dei dati dopo 3 secondi
    setTimeout(() => {
      this.getAllBooks();
    }, 3000);


    this.editingBook = this.bookService.editingBook;
    console.log("costruttore pagina stato ", this.pageStatus);
  }

  /**
   * Metodo di distruzione del componente, serve soprattutto a terminare le subscribe
   * */
  ngOnDestroy(){
    //this.bookService.getBooks().unsubscribe()
    this.subscription?.unsubscribe()
  }

  /**
   * Ottiene tutti i libri dal servizio e aggiorna la lista locale.
   */
  getAllBooks() {
    console.log("Page Status fuori ", this.pageStatus);
    this.pageStatus = PageStatus.loading; // Imposto di nuovo a loading per permettere l'aggiornamento della variabile ogni volta
    console.log("dopo fuori ", this.pageStatus);

    this.subscription= this.bookService.getBooks().subscribe({
      next: (res) =>{
        this.pageStatus = PageStatus.loaded; // Pagina in loaded poichè è stata caricata correttamente
        console.log("Page Status Next: ", this.pageStatus);
        this.allBooks = [...res]; //Spread operator
        console.log("Prova allBooks: ", this.allBooks);

      },
      error: (err) =>{
        this.pageStatus = PageStatus.error; // Pagina in error
        console.warn("Error in this page:", this.pageStatus);
      }
    })

  }

  reloadPage() {
    window.location.reload(); // funzione JS che ricarica la pagina corrente.
  }


  /**
   * Avvia la modifica di un libro, impostando il libro corrente nel servizio e navigando alla pagina di modifica.
   * @param codISBM Codice ISBM del libro da modificare

  editBook(codISBM: number) {
    // Aggiorna il libro attualmente in fase di modifica nel servizio
    this.bookService.setEditingBookByCodISBN(codISBM);

    // Naviga alla pagina di modifica includendo il codice ISBM come parametro nella query dell'URL
    this.router.navigate(['/ebook'], {queryParams: {codISBM: codISBM}});
  }

   */


  /**
   * Aggiunge un nuovo libro utilizzando il servizio.
   * Stampa anche un messaggio di successo e aggiorna la lista dopo l'aggiunta.
   */
  addNewBook() {
    console.log("Sono entrato");
    const newBook: Book = {
      codISBN: 0, // Sarà assegnato dal servizio prima dell'aggiunta
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

  protected readonly PageStatus = PageStatus;
}

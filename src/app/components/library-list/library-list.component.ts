import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../Book';
import {Subscription} from 'rxjs';
import {PageStatus} from '../pageStatus';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponentComponent} from "../dialog-component/dialog-component.component";

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy {

  // Array di stringhe che rappresentano le colonne da visualizzare nella tabella
  displayedColumns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action'];

  allBooks: Book[] = [];
  deleteError = false; // Serve per visualizzare un errore diverso se si verifica un errore in fase di delete.

  // Variabile per capire quando è stata effettuata la subscription
  subscription: Subscription | null = null;

  // Variabile per lo stato della pagina
  public pageStatus: PageStatus = PageStatus.loading; // Inizializzo a loading

  /**
   * Costruttore del componente.
   * @param bookService Servizio per la gestione dei libri
   * @param authService Servizio per l'autenticazione
   * @param router Oggetto per la navigazione tra le pagine
   * @param dialog
   */
  constructor(
    private bookService: BookService,
    private authService: AuthServiceService,
    private router: Router,
    public dialog: MatDialog,
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


  /*confirmCloseModal(codISBN: number, bookTitle: string) {

    console.log("Titolo del libro: ", bookTitle);

    this.deleteError = false;

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '450px',
      data: {
        codISBN: codISBN,
        title: bookTitle,
      }
    });

    //close modal() verrà assegnato al metodo cancel
    //afterclose() funzione di cancellazione del libro

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageStatus = PageStatus.loading; // Imposta lo stato della pagina su "loading"
        const bookToDelete = this.allBooks.find(book => book.codISBN === codISBN);

        if (bookToDelete) {
          this.bookService.deleteBook(bookToDelete).subscribe({
            next: (res) => {
              console.log("Libro cancellato:", res);
              this.getAllBooks(); // Aggiorna la lista dei libri dopo la cancellazione
            },
            error: (err) => {
              this.pageStatus = PageStatus.error; // Imposta lo stato della pagina su "error"
              console.error("Errore durante la cancellazione del libro:", err);
            }
          })
        } else {
          console.error("Libro non trovato con codice ISBN:", codISBN);
          this.deleteError = true;
          this.pageStatus = PageStatus.error;
        }
      }
      else {
        // L'utente ha cliccato "No" o ha chiuso il dialog
        console.log("L'utente ha annullato l'eliminazione del libro.");
      }
    })
  }*/


  confirmCloseDialog(codISBN: number, bookTitle: string) {
    console.log("Titolo del libro: ", bookTitle);

    this.deleteError = false;

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '450px',
      data: {
        codISBN: codISBN,
        title: bookTitle,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Sono qui");
        this.deleteBookIfConfirmed(codISBN);
      } else {
        console.log("L'utente ha annullato l'eliminazione del libro.");
      }
    });
  }

  deleteBookIfConfirmed(codISBN: number) {
    this.pageStatus = PageStatus.loading; // Imposta lo stato della pagina su "loading"
    const bookToDelete = this.allBooks.find(book => book.codISBN === codISBN);

    if (bookToDelete) {
      this.bookService.deleteBook(bookToDelete).subscribe({
        next: (res) => {
          console.log("Libro cancellato:", res);
          this.getAllBooks(); // Aggiorna la lista dei libri dopo la cancellazione
        },
        error: (err) => {
          this.pageStatus = PageStatus.error; // Imposta lo stato della pagina su "error"
          console.error("Errore durante la cancellazione del libro:", err);
        }
      })
    } else {
      console.error("Libro non trovato con codice ISBN:", codISBN);
      this.deleteError = true;
      this.pageStatus = PageStatus.error;
    }
  }



  // Enum per lo stato della pagina
  protected readonly PageStatus = PageStatus;
}

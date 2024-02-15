/**
 * Componente per la modifica dei dettagli di un libro.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../Book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageStatus } from '../pageStatus';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {

  // Variabile privata per memorizzare il numero ISBN del libro
  private codISBN: number = 0;
  // Array per memorizzare il libro in fase di modifica
  editingBook: Book[] = [];
  // FormGroup per la modifica dei dettagli del libro
  editBookForm!: FormGroup; // Aggiunto ! per indicare che sarà inizializzato in ngOnInit
  // Array per memorizzare i dettagli del libro aggiornato
  updatedBook: Book[] = [];
  // Sottoscrizione per gestire gli observable
  subscription: Subscription | null = null;
  // Variabile per tracciare se il processo di modifica è completato
  completed: boolean = false;
  // Variabile di stato della pagina
  public pageStatus: PageStatus = PageStatus.loading; // Inizializzato a "loading"

  // Durata del messaggio a comparsa
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  /**
   * Metodo di inizializzazione chiamato quando il componente viene caricato.
   * Responsabile del recupero dei dettagli del libro e dell'inizializzazione del form di modifica.
   */
  ngOnInit() {
    this.getBookInfo();
    this.editBookForm = this.createEditBookForm();
  }

  /**
   * Hook di ciclo di vita per disiscriversi dagli observable quando il componente viene distrutto.
   */
  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }

  /**
   * Metodo per ottenere solo il codice ISBN dai parametri della query.
   */
  getCodISBN(): void {
    this.subscription = this.route.queryParams.subscribe({
      next: (res) => {
        this.codISBN = +res['codISBN'] || 0;
        console.log("getBookInfo() codISBN: ", this.codISBN);
      },
      error: () => {
        console.error("codISBN non trovato");
      }
    });
  }

  /**
   * Metodo per recuperare le informazioni del libro utilizzando il codice ISBN ottenuto.
   */
  getBookInfo() {
    this.getCodISBN();
    this.pageStatus = PageStatus.loading;

    this.subscription = this.bookService.getBooks().subscribe({
      next: (res) => {
        this.pageStatus = PageStatus.loaded;
        this.editingBook = res;

        // Cerca se c'è un libro con un codice ISBN corrispondente a quello ottenuto
        const bookFound: Book[] = this.editingBook.filter(b => b.codISBN === this.codISBN);

        if (bookFound.length > 0) {
          // Recupera i dati di quel singolo libro
          console.log("Libro trovato:", bookFound[0]);
          this.setFormValues(bookFound[0]);
        } else {
          this.pageStatus = PageStatus.error; // Pagina in errore
          console.error("Impossibile accedere a questo libro");
        }

      },
      error: (err) => {
        // Dati del libro non recuperabili
        this.pageStatus = PageStatus.error; // Pagina in errore
        console.error("Impossibile recuperare i dati di questo libro ", err);
      }
    });
  }

  /**
   * Metodo per impostare i valori del form con i dati del libro.
   * @param book L'oggetto libro contenente i dati da impostare nel form.
   */
  setFormValues(book: Book) {
    this.editBookForm.patchValue({
      id: book.id,
      codISBN: book.codISBN,
      title: book.title,
      author: book.author,
      dateOfPublication: book.dateOfPublication,
      genre: book.genre,
    });
  }

  /**
   * Metodo per creare il form di modifica del libro.
   * @returns Oggetto FormGroup che rappresenta il form di modifica del libro.
   */
  createEditBookForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('', Validators.required),
      codISBN: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      dateOfPublication: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }

  /**
   * Metodo per modificare i dettagli del libro.
   * Aggiorna i dettagli del libro con i valori dal form di modifica.
   */
  editBook() {
    this.completed = false;

    const updatedBook: Book = {
      codISBN: this.editBookForm.value.codISBN,
      id: this.editBookForm.value.id,
      title: this.editBookForm.value.title,
      author: this.editBookForm.value.author,
      dateOfPublication: this.editBookForm.value.dateOfPublication,
      genre: this.editBookForm.value.genre
    };

    this.subscription = this.bookService.updateBookInfo(updatedBook).subscribe({
      next: (res) => {
        this.completed = false;
        this.updatedBook = res;

        if (updatedBook) {
          console.log("Libro aggiornato con successo", res);
          this.completed = true;

          if (this.completed) {
            this._snackBar.open('Book editing completed successfully', 'Close', {
              duration: this.durationInSeconds * 1000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition
            });
          }
        } else {
          this.completed = false;
          console.error("Errore nel form di modifica");
          this.editBook();
        }
      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento del libro:', err);
      }
    });
  }

  // Enum per lo stato della pagina
  protected readonly PageStatus = PageStatus;
}

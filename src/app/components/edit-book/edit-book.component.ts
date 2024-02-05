import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";

/**
 * @description Componente per la modifica di un libro esistente.
 */
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editingBook: Book | undefined;
  editBookForm: FormGroup; // Dichiarazione del FormGroup per il form di modifica

  /**
   * @description Costruttore del componente.
   * @param router Servizio di routing per la navigazione tra le pagine.
   * @param bookService Servizio per la gestione dei libri.
   * @param route Servizio per ottenere i parametri dall'URL.
   * @param location Servizio per la navigazione all'indietro.
   */
  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute, private location: Location) {
    this.editingBook = this.bookService.editingBook;
    this.editBookForm = this.createEditBookForm(); // Creazione del FormGroup al momento dell'inizializzazione
  }

  ngOnInit() {
    // Recupera il parametro codISBM dalla query dell'URL
    this.route.queryParams.subscribe(params => {
      const codISBM = +params['codISBM']; // Il "+" converte la stringa in un numero
      console.log("Sono qui", codISBM)
      // Imposta il libro in fase di modifica nel servizio
      this.bookService.setEditingBookByCodISBM(codISBM);
      console.log("book: ",this.bookService.editingBook)
    });

    // Inizializzazione dei valori del form con i dati del libro prima della modifica
    if (this.editingBook) {
      this.editBookForm.patchValue({
        // Assegnazione dei valori dei campi del libro al FormGroup
        title: this.editingBook.title,
        author: this.editingBook.author,
        dateOfPublication: this.editingBook.dateOfPublication,
        genre: this.editingBook.genre
      });
    }
  }

  /**
   * @description Crea il FormGroup con i controlli necessari per il form di modifica.
   * @returns FormGroup per il form di modifica.
   */
  createEditBookForm(): FormGroup {
    return this.editBookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      dateOfPublication: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }

  /**
   * @description Effettua la modifica del libro.
   */
  editBook() {
    // Verifica se il formulario è valido e se il libro è in fase di modifica
    if (this.editBookForm.valid && this.editingBook) {
      // Effettua le modifiche necessarie al libro utilizzando i dati dal formulario
      const updatedBook: Book = {
        codISBM: this.editingBook.codISBM,
        title: this.editBookForm.value.title,
        author: this.editBookForm.value.author,
        dateOfPublication: this.editBookForm.value.dateOfPublication,
        genre: this.editBookForm.value.genre
      };

      // Chiama il servizio per aggiornare il libro
      this.bookService.updateBook(updatedBook);

      // Naviga indietro alla lista dei libri dopo la modifica
      this.location.back();
    } else {
      // Gestisce il caso in cui il form non è valido
    }
  }

  /**
   * @description Elimina il libro e naviga indietro alla lista dei libri.
   */
  deleteBook() {
    // Chiama il servizio per eliminare il libro
    this.bookService.deleteBook(this.editingBook?.codISBM || 0);

    // Naviga indietro alla lista dei libri dopo l'eliminazione
    this.router.navigate(['/library']);
  }
}

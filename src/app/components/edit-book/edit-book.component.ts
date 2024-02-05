import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editingBook: Book | undefined;
  editBookForm: FormGroup; // Dichiarazione del FormGroup per il form di modifica

  constructor(private router: Router, private bookService: BookService) {
    this.editingBook = this.bookService.editingBook;
    this.editBookForm = this.createEditBookForm(); // Creazione del FormGroup al momento dell'inizializzazione
  }

  ngOnInit() {
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
   * Crea il FormGroup con i controlli necessari.
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
   * Effettua la modifica del libro.
   */
  editBook() {
    // Verifica se il formulario è valido
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
      this.router.navigate(['/library']);
    } else {
      // Caso in cui il form non è valido
    }
  }

  /**
   * Elimina il libro.
   */
  deleteBook() {

    // Naviga indietro alla lista dei libri dopo l'eliminazione
    this.router.navigate(['/library']);
  }
}

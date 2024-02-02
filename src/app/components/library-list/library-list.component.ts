import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../services/auth-service.service";
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit {
  title = 'LibraryProject';

  displayedColumns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action'];
  allBooks: Book[] = [];
  editingBook: Book | undefined;

  constructor(private bookService: BookService, private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    // Inizializzazione al caricamento del componente
    this.getAllBooks();
    this.editingBook = this.bookService.editingBook; // inizializzazione di editingBook
  }

  // Ottieni tutti i libri dal servizio e aggiorna la lista locale
  getAllBooks() {
    console.log('List of Books');
    this.allBooks = this.bookService.getBook();
    console.log(this.allBooks);
  }

  // Avvia la modifica di un libro richiamando il servizio
  editBook(bookId: number) {
    this.editingBook = this.bookService.editBook(bookId);
  }

  // Elimina un libro richiamando il servizio
  deleteBook(bookId: number) {
    this.bookService.deleteBook(bookId);
  }

  // Completa la modifica di un libro richiamando il servizio
  onEditComplete(){
    this.bookService.onEditComplete();
  }
}

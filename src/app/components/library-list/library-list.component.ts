import { Component, Input, OnInit } from '@angular/core';
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

  displayedColumns: string[] = [ 'title', 'author', 'dateOfPublication', 'genre'];
  allBooks: Book[] = [];
  constructor(private bookService: BookService, private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.getAllBooks();
  }

  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Richiamo il metodo del mio BookService per avere tutti i libri a disposizione
  getAllBooks() {
    console.log('List of Books');
    this.allBooks = this.bookService.getBook();
    console.log(this.allBooks);
  }



}

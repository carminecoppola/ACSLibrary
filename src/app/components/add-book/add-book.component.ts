import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageStatus} from "../pageStatus";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../services/book.service";
import {Book} from "../Book";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy{

  addBookForm!: FormGroup;
  subscription: Subscription | null = null;
  countBookID!: number;

  // Array per memorizzare i dettagli del libro aggiornato
  newBook: Book[] = [];

  public pageStatus: PageStatus = PageStatus.loading;

  // Durata del messaggio a comparsa
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ){}


  ngOnInit(){
    this.addBookForm = this.createAddBookForm();

    // Ottieni il numero di libri e assegna il valore a countBookID
    this.bookService.getBooks().pipe(
      map(books => books.length) // Utilizza l'operatore map per ottenere la lunghezza dell'array di libri
    ).subscribe(length => {
      this.countBookID = length;
    });

  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private createAddBookForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('', Validators.required),
      codISBN: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      dateOfPublication: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }

  addBook() {
    console.log("Sono in addBook");
    this.pageStatus = PageStatus.loaded;
    console.log("Status:", this.pageStatus)

    const nextId = this.countBookID + 1;

    const newBook: Book = {
      id: nextId,
      codISBN: this.addBookForm.value.codISBN,
      title: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      dateOfPublication: this.addBookForm.value.dateOfPublication,
      genre: this.addBookForm.value.genre
    };

    this.bookService.createdBook(newBook).subscribe({
      next: (res) => {
        this.pageStatus = PageStatus.loaded;
        console.log("Status next:", this.pageStatus)
        this.newBook = res;
        this.router.navigate(['/library']);
      },
      error: (err) => {
        this.pageStatus = PageStatus.error;
        console.log("Status error:", this.pageStatus)
        console.error('Errore durante aggiunta del libro:', err);
      }
    });
  }


  /*
  * Bottone aggiunta
  * Router aggiustato
  * SnackBar con timer
  *
  * */

  protected readonly PageStatus = PageStatus;
}

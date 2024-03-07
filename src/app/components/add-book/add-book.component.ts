import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageStatus } from "../pageStatus";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../../services/book.service";
import { Book } from "../Book";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

/**
 * Component for adding a new book.
 */
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit, OnDestroy {

  public addBookForm!: FormGroup; // Form group for adding a new book
  subscription: Subscription | null = null; // Subscription to manage observables
  newBook: Book[] = []; // Array to store the newly added book
  public pageStatus: PageStatus = PageStatus.loading; // Page status variable

  // Snackbar variables
  timer: number = 5;
  message: string | null = null;
  durationInSeconds: number = 5;

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){
    this.addBookForm = this.createAddBookForm();
    this.pageStatus = PageStatus.loaded;
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  /**
   * Method to create the form for adding a new book.
   * @returns FormGroup object representing the add book form.
   */
  public createAddBookForm(): FormGroup {
    return new FormGroup({
      codISBN: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      dateOfPublication: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
    });
  }

  /**
   * Method to add a new book.
   * Sends the new book details to the server and handles the response.
   */
  addBook() {
    if (this.addBookForm.valid) {
      this.pageStatus = PageStatus.loading;

      const newBook: Book = {
        codISBN: this.addBookForm.value.codISBN,
        title: this.addBookForm.value.title,
        author: this.addBookForm.value.author,
        dateOfPublication: this.addBookForm.value.dateOfPublication,
        genre: this.addBookForm.value.genre
      };

      this.bookService.createdBook(newBook).subscribe({
        next: (res) => {
          this.pageStatus = PageStatus.loaded;
          this.newBook = res;
          this.startCountdown();
        },
        error: (err) => {
          this.pageStatus = PageStatus.error;
          console.error('Error adding the book:', err);
        }
      });
    }
    else {
      console.error("The form must be complete to be submitted")
    }
  }

  /**
   * Method to start the countdown timer for redirection after adding a new book.
   */
  startCountdown() {
    this.timer = 5;
    let interval = setInterval(() => {
      if (this.timer != 0) {
        this.timer--;
        console.log(this.timer);
        this.message = `Redirecting in ${this.timer}s...`;
      } else {
        clearInterval(interval);
        this.router.navigate(['/library']);
        this.message = null;
      }
    }, 1000);
  }

  // Enum for page status
  protected readonly PageStatus = PageStatus;
}

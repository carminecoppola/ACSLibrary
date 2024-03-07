import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../Book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PageStatus } from '../pageStatus';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NavbarComponent } from "../navbar/navbar.component";

/**
 * Component for editing book details.
 */
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit, OnDestroy {

  private codISBN: number = 0; // Private variable to store the ISBN number of the book
  editingBook: Book[] = []; // Array to store the book being edited
  editBookForm!: FormGroup; // FormGroup for editing book details
  updatedBook: Book[] = []; // Array to store the updated book details
  subscription: Subscription | null = null; // Subscription to manage observables
  completed: boolean = false; // Variable to track if the editing process is completed
  public pageStatus: PageStatus = PageStatus.loading; // Page status variable

  // Snackbar duration
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
   * Method called when the component is loaded.
   * Responsible for retrieving book details and initializing the edit form.
   */
  ngOnInit() {
    this.getBookInfo();
    this.editBookForm = this.createEditBookForm();
  }

  /**
   * Lifecycle hook to unsubscribe from observables when the component is destroyed.
   */
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  /**
   * Method to extract only the ISBN code from query parameters.
   */
  getCodISBN(): void {
    this.subscription = this.route.queryParams.subscribe({
      next: (res) => {
        this.codISBN = +res['codISBN'] || 0;
        console.log("getBookInfo() codISBN: ", this.codISBN);
      },
      error: () => {
        console.error("codISBN not found");
      }
    });
  }

  /**
   * Method to retrieve book information using the obtained ISBN code.
   */
  getBookInfo() {
    this.getCodISBN();
    this.pageStatus = PageStatus.loading;

    this.subscription = this.bookService.getBooks().subscribe({
      next: (res) => {
        this.pageStatus = PageStatus.loaded;
        this.editingBook = res;

        // Check if there is a book with an ISBN code matching the obtained one
        const bookFound: Book[] = this.editingBook.filter(b => b.codISBN === this.codISBN);

        if (bookFound.length > 0) {
          // Retrieve the data of that single book
          console.log("Book found:", bookFound[0]);
          this.setFormValues(bookFound[0]);
        } else {
          this.pageStatus = PageStatus.error; // Page in error
          console.error("Unable to access this book");
        }

      },
      error: (err) => {
        // Book data not retrievable
        this.pageStatus = PageStatus.error; // Page in error
        console.error("Unable to retrieve data for this book", err);
      }
    });
  }

  /**
   * Method to set form values with book data.
   * @param book The book object containing data to set in the form.
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
   * Method to create the book edit form.
   * @returns FormGroup object representing the book edit form.
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
   * Method to edit book details.
   * Updates the book details with values from the edit form.
   */
  editBook() {
    this.completed = false;

    const updatedBook: Book = {
      id: this.editBookForm.value.id,
      codISBN: this.editBookForm.value.codISBN,
      title: this.editBookForm.value.title,
      author: this.editBookForm.value.author,
      dateOfPublication: this.editBookForm.value.dateOfPublication,
      genre: this.editBookForm.value.genre
    };

    this.subscription = this.bookService.updateBookInfo(updatedBook).subscribe({
      next: (res) => {
        this.updatedBook = res;

        if (updatedBook) {
          console.log("Book updated successfully", this.updatedBook);
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
          console.error("Error in edit form");
          this.editBook();
        }
      },
      error: (err) => {
        console.error('Error updating the book:', err);
      }
    });
  }

  // Enum for page status
  protected readonly PageStatus = PageStatus;
}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../Book';
import { Subscription } from 'rxjs';
import { PageStatus } from '../pageStatus';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

/**
 * Component for displaying the list of books in the library.
 */
@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent implements OnInit, OnDestroy, AfterViewInit {

  columns: string[] = ['title', 'author', 'dateOfPublication', 'genre', 'action']; // Columns to display in the table
  allBooks!: Book[];

  dataSource!: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginator

  deleteError: boolean = false; // Indicates whether there was an error during deletion
  subscription: Subscription | null = null; // Variable to close the subscription (currently not used)

  // Snackbar duration
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public pageStatus: PageStatus = PageStatus.loading; // Variable for page status

  /**
   * Constructor of the component.
   * @param bookService Service for managing books
   * @param authService Authentication service
   * @param router Object for navigating between pages
   * @param dialog Object for managing dialogs
   * @param _snackBar Object for managing snackbar
   */
  constructor(
    private bookService: BookService,
    private authService: AuthServiceService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  /**
   * Method called on component initialization.
   * Calls the method to get all books.
   */
  ngOnInit() {
    this.getAllBooks();
  }

  /**
   * Method for component destruction, primarily used to unsubscribe.
   */
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Method called after Angular has initialized the component's views.
   * Initializes the paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Gets all books from the service and updates the local list.
   */
  getAllBooks() {
    this.pageStatus = PageStatus.loading;

    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.pageStatus = PageStatus.loaded;
        this.allBooks = [...res];
        this.dataSource = new MatTableDataSource<Book>(this.allBooks); // dataSource with books obtained for Ng Material
        this.dataSource.paginator = this.paginator;  // Associates the paginator with the dataSource
      },
      error: (err) => {
        this.pageStatus = PageStatus.error;
        console.error("Error while retrieving books:", err);
      }
    });
  }

  /**
   * Handles the page change event in the paginator.
   * @param event The page change event.
   */
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.dataSource.data = this.allBooks.slice(startIndex, endIndex);
  }

  /**
   * Applies the filter to the books table.
   * @param event The input event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (filterValue.length >= 3) {
      this.dataSource.filter = filterValue;
    } else if (filterValue.length === 0) {
      this.dataSource.filter = '';
    }
  }

  /**
   * Sorts the data in the books table based on the selected sorting.
   * @param sort The sorting option.
   */
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.allBooks; // Restores the original data
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'author':
          return this.compare(a.author, b.author, isAsc);
        case 'dateOfPublication':
          return this.compare(a.dateOfPublication, b.dateOfPublication, isAsc);
        case 'genre':
          return this.compare(a.genre, b.genre, isAsc);
        default:
          return 0;
      }
    });
  }

  /**
   * Comparison function for sorting.
   * @param a First value to compare.
   * @param b Second value to compare.
   * @param isAsc Flag for ascending or descending sorting.
   * @returns The result of the comparison.
   */
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  /**
   * Initiates the edit of a book by setting the current book in the service and navigating to the edit page.
   * @param codISBN The ISBN code of the book to edit.
   */
  editBook(codISBN: number) {
    this.router.navigate(['/edit-book'], { queryParams: { codISBN: codISBN }});
  }

  /**
   * Adds a new book, navigating to the add page.
   */
  addNewBook() {
    this.router.navigate(['/add-book']);
  }

  /**
   * Opens a dialog to confirm the deletion of a book or cancel it.
   * @param codISBN The ISBN code of the book to delete.
   * @param bookTitle The title of the book to delete.
   */
  confirmCloseDialog(codISBN: number, bookTitle: string) {
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
        this.deleteBookIfConfirmed(codISBN);
      } else {
        console.log("User canceled book deletion.");
      }
    });
  }

  /**
   * Deletes a book after confirming its deletion.
   * @param codISBN The ISBN code of the book to delete.
   */
  deleteBookIfConfirmed(codISBN: number) {
    this.pageStatus = PageStatus.loading;

    const bookToDelete = this.allBooks.find(book => book.codISBN === codISBN);

    if (bookToDelete) {
      this.bookService.deleteBook(bookToDelete).subscribe({
        next: (res) => {
          console.log("Book deleted:", res);
          this.getAllBooks();

          this._snackBar.open('Book successfully deleted', 'Close', {
            duration: this.durationInSeconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        },
        error: (err) => {
          this.pageStatus = PageStatus.error;
          console.error("Error deleting the book:", err);
        }
      });
    } else {
      console.error("Book not found with ISBN code:", codISBN);
      this.deleteError = true;
      this.pageStatus = PageStatus.error;
    }
  }

  protected readonly PageStatus = PageStatus;
}

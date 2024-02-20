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
export class AddBookComponent implements OnInit, OnDestroy {

  public addBookForm!: FormGroup;
  subscription: Subscription | null = null;
  newBook: Book[] = [];
  public pageStatus: PageStatus = PageStatus.loading;

  //SnackBar Variable
  timer: number = 5
  message: string | null= null;
  durationInSeconds: number = 5;
  /*timerValue: number = this.durationInSeconds;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';*/
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
          //this.showSuccessSnackbar();
          this.startCountdown();
        },
        error: (err) => {
          this.pageStatus = PageStatus.error;
          console.error('Errore nell\' aggiunta del libro:', err);
        }
      });
    }
    else {
      console.error("Il form deve essere completo per essere inviato")
    }
  }


  /*showSuccessSnackbar() {
    const message:string = `Libro aggiunto con successo. Sarai reindirizzato tra ${this.timerValue} secondi.`
    const action:string = 'Chiudi';
    // Apri il messaggio Snackbar con la durata del timer come durata
    const snackbarRef = this._snackBar.open(message, action, {
        duration: this.durationInSeconds * 1000, // Durata in millisecondi
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  }*/


  /*Finchè il timer non arriva a 0
  * Decrementa il timer e invia il valore del timer sul messaggio
  * Quando arriva a 0 router su library list */


  startCountdown() {
    this.timer = 5
    let interval = setInterval(() => {
      if (this.timer != 0) {
        this.timer--
        console.log(this.timer);
        this.message = `redirecting in ${this.timer}s...`;
      } else {
        clearInterval(interval)
        this.router.navigate(['/library']);
        this.message = null
      }
    }, 1000);
  }


  protected readonly PageStatus = PageStatus;
}

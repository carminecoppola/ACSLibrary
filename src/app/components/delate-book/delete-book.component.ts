import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageStatus} from "../pageStatus";
import {Subscription} from "rxjs";
import {BookService} from "../../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../Book";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponentComponent} from "../dialog-component/dialog-component.component";

@Component({
  selector: 'app-delate-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit, OnDestroy {

  public pageStatus: PageStatus = PageStatus.loading;
  subscription: Subscription | null = null;

  private codISBN: number = 0;
  title: string = '';
  deletingBook: Book[] = [];


  ngOnInit(): void {
    // Chiamare il metodo delateBook() all'avvio del componente
    this.delateBook();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(
    private router: Router,
    private bookService: BookService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
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


  /*delateBook(){

    this.pageStatus = PageStatus.loading;

    this.getCodISBN(); //Per avere il codISBN
    console.log("Delete Codice ISBN",this.codISBN);

    this.subscription =this.bookService.getBooks().subscribe({
      next:() =>{
        this.deletingBook.filter(b => b.codISBN === this.codISBN);

        console.log("Deleting book:",this.deletingBook[0]);

        //console.log("Libro da cancellare", bookFound[0]);
      },
      error:()=>{
        console.error("Errorreeee");
      }
    })

    if (this.deletingBook){
      this.subscription = this.bookService.deleteBook(this.deletingBook[0]).subscribe({
        next:(res) =>{
          this.pageStatus = PageStatus.loaded;
          console.log("Res:",res);

          const dialogRef = this.dialog.open(DeleteBookComponent, {
            width: '250px',
            //data: { book: res}
            });

          dialogRef.afterClosed().subscribe(result => {
            if (result) { // Se l'utente ha cliccato "Yes"
              this.deletingBook[0] = res;

              console.log("Utente ha scelto YES",result);
              //console.log("Bookfound e res:", bookFound, res);
              console.log("Libro cancellato");

            } else {
              // L'utente ha cliccato "No" o ha chiuso il dialog
              console.log("Utente ha scelto NO",result);
              this.router.navigate(['/library-list']); // Reindirizza alla lista dei libri
            }
          });

        },
        error:(err) =>{
          this.pageStatus = PageStatus.error;
          console.error("Errore nella cancellazione");
        },
      })
    }
  }*/


  delateBook() {
    this.getCodISBN();

    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.pageStatus = PageStatus.loaded;
        this.deletingBook = res;

        // Cerca se c'è un libro con un codice ISBN corrispondente a quello ottenuto
        const bookFound: Book[] = this.deletingBook.filter(b => b.codISBN === this.codISBN);



        if (bookFound.length > 0) {
          // Recupera i dati di quel singolo libro
          console.log("Libro trovato:", bookFound[0]);
          this.title = bookFound[0].title;
          console.log("Titolo:",this.title);
          //Devo passarlo a dialogComponent con @Input

          const dialogRef = this.dialog.open(DialogComponentComponent, {
            width: '400px',
            data: { title: this.title }
          });

          console.log(1);

          dialogRef.afterClosed().subscribe(result => {
            console.log(2);
            if (result) { // Se l'utente ha confermato l'eliminazione
              console.log("scelta:", result);
              console.log(3);
              this.deletingBook = this.deletingBook.filter(b => b == bookFound[0]);
              this.bookService.deleteBook(bookFound[0]).subscribe({
                next: (res) => {
                  console.log("Res:", res);
                  console.log("Libro cancellato:", bookFound[0]);
                  this.router.navigate(['/library']); // Reindirizza alla lista dei libri
                }
              });
            } else {
              // L'utente ha cliccato "No" o ha chiuso il dialog
              console.log("Utente ha scelto NO", result);
              this.router.navigate(['/library']); // Reindirizza alla lista dei libri
            }
          });

        } else {
          // Il libro non è stato trovato
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

  protected readonly PageStatus = PageStatus;
}

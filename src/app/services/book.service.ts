import { Injectable } from '@angular/core';
import {Book} from "../components/Book";
import {BOOKS} from "../mock/mockBook";

@Injectable({
  providedIn: 'root'
})
export class BookService{

  constructor() { }

  //Mi richiamo direttamente l'array BOOKS nel mio mock
  getBook():Book[]{
    return BOOKS
  }

}

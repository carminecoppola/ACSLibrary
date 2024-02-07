import { Injectable } from '@angular/core';
import { User } from "../components/User";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";

/**
 * Servizio di autenticazione che gestisce il login, logout e fornisce informazioni sull'autenticazione.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  /**
   * Variabile che tiene traccia dello stato dell'utente loggato.
   */
  userData: User | null = null;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Effettua il login dell'utente verificando le credenziali fornite.
   */
  getUsers(): Observable<any>{
    //return un observable di user
    return this.http.get('http://localhost:3000/users')
  }


  /**
   * Verifica se l'utente è attualmente autenticato.
   * @returns true se l'utente è autenticato, altrimenti false.
   */
  isAuthenticated(): boolean {
    return this.userData !== null;
  }

  /**
   * Effettua il logout resettando le informazioni sull'utente e gli eventuali messaggi di errore.
   */
  logout() {
    this.userData = null;
  }

}

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

  /**
   * Variabile per memorizzare eventuali messaggi di errore durante l'autenticazione.
   */
  authenticationError: string | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Effettua il login dell'utente verificando le credenziali fornite.
   * @param username Nome utente inserito durante il login.
   * @param password Password inserita durante il login.
   * @returns Un Observable che emette true se il login ha avuto successo, altrimenti false.
   * @catchError Gestisce la situazione in cui le credenziali non sono valide
   */

  /*
  loginUser(username: string , password: string ): Observable<boolean> {
    /**
     * Effettua una richiesta HTTP per recuperare l'utente corrispondente dal JSON Server.
     *  La chiamata include anche i parametri username e password nella query per
     *  cercare un utente nel nostro JSON Server.
     *  .pipe(): permette di concatenare più operatori per trasformare i dati ricevuti
     *  dalla chiamata HTTP.
     *  map viene utilizzato per trasformare la risposta della chiamata HTTP.
     *  Riceve un array di utenti (users) e controlla se l'array non è vuoto.
     *


    //rivedi
    return this.http.get<User[]>(`http://localhost:3000/users?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          this.userData = users[0];
          return true;
        }else {
          // Credenziali non valide
          this.authenticationError = 'Ops, invalid credentials';
          return false;
        }

      }),
      catchError(error => {
        console.error('Error in the LogIN:', error);
        return of(false);
      })
    );
  }*/


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

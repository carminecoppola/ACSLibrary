import { Injectable } from '@angular/core';
import { User } from "../components/User";
import { find } from "rxjs";
import { USERS } from "../mock/mockUser";

/**
 * @description Servizio di autenticazione che gestisce il login, logout e fornisce informazioni sull'autenticazione.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  /**
   * @description Variabile che tiene traccia dello stato dell'utente loggato.
   */
  private userData: User | null = null;

  /**
   * @description Variabile per memorizzare eventuali messaggi di errore durante l'autenticazione.
   */
  private authenticationError: string | null = null;

  /**
   * @description Effettua il login dell'utente verificando le credenziali fornite.
   * @param username Nome utente inserito durante il login.
   * @param password Password inserita durante il login.
   * @returns Restituisce true se il login ha avuto successo, altrimenti false.
   */
  loginUser(username: string | null | undefined, password: string | null | undefined): boolean {
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
      this.userData = user;
      return true;
    } else { //Credenziali sbagliate
      this.userData = null;
      this.authenticationError = 'Ops, Invalid Credentials';
      return false;
    }
  }

  /**
   * @description Verifica se l'utente è attualmente autenticato.
   * @returns Restituisce true se l'utente è autenticato, altrimenti false.
   */
  isAuthenticated(): boolean {
    return this.userData !== null;
  }

  /**
   * @description Restituisce eventuali messaggi di errore durante l'autenticazione.
   * @returns Messaggio di errore o NULL se non ci sono errori.
   */
  getAuthenticationError(): string | null {
    return this.authenticationError;
  }

  /**
   * @description Effettua il logout resettando le informazioni sull'utente e gli eventuali messaggi di errore.
   */
  logout() {
    this.userData = null;
    this.authenticationError = null;
  }

}

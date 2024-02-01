import { Injectable } from '@angular/core';
import {User} from "../components/User";
import {find} from "rxjs";
import {USERS} from "../mock/mockUser";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userData:User | null = null; // Creo una variabile per identificare se l'utente è loggato o no

  private authenticationError:string | null = null; // La utilizzo per il messaggio di errore in caso di password

  loginUser(username: string | null | undefined, password: string | null | undefined):boolean{
    //Verifico se esiste un utente con username e password passati alla funzione
    // find() restituisce uno soltanto
    const user = USERS.find(u => u.username === username && u.password === password)


    //Se esiste l'utente setto la variabile userData ai dati dell'utente e imposto true altrimenti imposto false
    if (user){
      this.userData = user
      return true
    }
    else {
      this.userData = null
      this.authenticationError = 'Ops, Invalid Credentials'
      return false
    }
  }


  // Restituisce true se l'utente è autenticato (this.userData non è null), altrimenti restituisce false
  isAuthenticated(): boolean {
    return this.userData !== null; // return vero se diverso da null
  }

  getAuthenticationError(): string | null {
    return this.authenticationError;
  }

  logout(){
    this.userData = null
    this.authenticationError = null
  }

}

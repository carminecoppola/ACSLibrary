import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from "../../services/auth-service.service";
import { HttpClient } from "@angular/common/http";

/**
 * Componente per la gestione della pagina di login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Form di login con campi per username e password.
   */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * Variabile per memorizzare eventuali messaggi di errore durante il login.
   */
  messageError: string | null = null;

  /**
   * Costruttore del componente.
   * @param router Servizio di routing per la navigazione tra le pagine.
   * @param authService Servizio di autenticazione per gestire le operazioni di login.
   * @param http Servizio HttpClient per effettuare richieste HTTP.
   */
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private http: HttpClient,
  ) {}

  /**
   * Gestisce l'invio del form di login.
   * Effettua una chiamata al Servizio di Autenticazione per effettuare il login utilizzando i dati forniti nel form.
   * Se il login ha successo, reindirizza l'utente alla pagina LibraryListComponent (next).
   * Se il login fallisce, visualizza il messaggio di errore restituito dal Servizio di Autenticazione (error).
   */
  submitForm() {
    const { username, password } = this.loginForm.value;

    // Effettua una chiamata al metodo loginUser del servizio AuthServiceService, che restituisce un Observable booleano.
    // L'observable restituisce true se il login ha successo, altrimenti restituisce false.
    // Si sottoscrive l'observable per gestire il risultato.
    this.authService.loginUser(username, password).subscribe({
      next: (loggedIn) => {
        if (loggedIn) {
          // Se il login ha avuto successo, reindirizza l'utente alla pagina LibraryListComponent.
          this.router.navigate(['/library']);
        }
        else {
          this.messageError = this.authService.getAuthenticationError();
        }
      },
      error: (error) => {
        // Se si verifica un errore durante il login, visualizza il messaggio di errore restituito dal servizio di autenticazione.

      }
    });
  }

}

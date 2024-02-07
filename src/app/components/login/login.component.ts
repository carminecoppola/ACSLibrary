import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from "../../services/auth-service.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../User";

/**
 * Questo componente gestisce la pagina di login dell'applicazione.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Form per il login che contiene campi per l'username e la password.
   */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * Variabile utilizzata per memorizzare eventuali messaggi di errore durante il processo di login.
   */
  messageError: string | null = null;

  /**
   * Costruttore del componente.
   * @param router Servizio di routing per la navigazione tra le pagine dell'applicazione.
   * @param authService Servizio di autenticazione per gestire le operazioni di login.
   */
  constructor(
    private router: Router,
    private authService: AuthServiceService,
  ) {}

  /**
   * Questo metodo gestisce l'invio del form di login.
   * Effettua una chiamata al servizio di autenticazione per effettuare il login utilizzando i dati forniti nel form.
   * Se il login ha successo, reindirizza l'utente alla pagina LibraryListComponent.
   * Se il login fallisce, visualizza un messaggio di errore.
   */
  submitForm() {
    const { username, password } = this.loginForm.value;

    this.authService.getUsers().subscribe({
      next: (res) => {
        console.log("Prova getUser: ", res);
        // Cerca l'utente nel risultato della chiamata al servizio di autenticazione.
        const findUser = res.find((user: User) => user.username === username && user.password === password);
        console.log("Utente trovato", findUser);

        if (findUser) {
          // Se l'utente è trovato, memorizza i suoi dati e reindirizza alla pagina Library.
          this.authService.userData = findUser;
          this.router.navigate(['/library']);
        } else {
          // Se l'utente non è trovato, imposta un messaggio di errore.
          this.messageError = "Credenziali non valide";
        }
      }
    });
  }


}

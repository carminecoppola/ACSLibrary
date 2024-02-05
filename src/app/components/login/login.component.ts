import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from "../../services/auth-service.service";

/**
 * @description Componente per la gestione della pagina di login.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * @description Form di login con campi per username e password.
   */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * @description Variabile per memorizzare eventuali messaggi di errore durante il login.
   */
  messageError: string | null = null;

  /**
   * @description Costruttore del componente.
   * @param router Servizio di routing per la navigazione tra le pagine.
   * @param authService Servizio di autenticazione per gestire le operazioni di login.
   */
  constructor(private router: Router, private authService: AuthServiceService) {}

  /**
   * @description Gestisce l'invio del form di login.
   */
  submitForm() {
    console.log(this.loginForm.value);

    const { username, password } = this.loginForm.value;

    if (this.authService.loginUser(username, password)) {
      // Effettua il routing verso il componente LibraryListComponent in caso di login corretto.
      this.router.navigate(['/library']);
    } else {
      // Visualizza il messaggio di errore e rimane sulla stessa pagina in caso di login fallito.
      this.messageError = this.authService.getAuthenticationError();
      this.router.navigate(['/']);
    }
  }
}

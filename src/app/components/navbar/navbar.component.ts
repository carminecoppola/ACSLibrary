import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Componente per la barra di navigazione (navbar).
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /** Titolo visualizzato nella navbar. */
  title = 'ACLibrary';

  /** Flag che indica se l'utente è autenticato. */
  isLoggedIn: boolean = this.authService.isAuthenticated();

  /** Flag che indica se mostrare o nascondere la freccia per tornare alla pagina precedente. */
  showBackButton: boolean = false;

  /**
   * Costruttore del componente.
   * @param authService Servizio di autenticazione.
   * @param router Oggetto per la navigazione tra le pagine.
   * @param location Servizio per gestire la localizzazione (navigazione all'indietro).
   */
  constructor(private authService: AuthServiceService, private router: Router, private location: Location) {
    // Sottoscrizione agli eventi di navigazione per gestire la visibilità della freccia
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Aggiorna il flag per mostrare o nascondere la freccia in base alla pagina corrente
        this.showBackButton = this.router.url !== '/login';
      }
    });
  }

  /**
   * Esegue il logout e naviga verso la pagina di login.
   */
  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Torna alla pagina precedente.
   */
  goBack() {
    this.location.back();
  }
}

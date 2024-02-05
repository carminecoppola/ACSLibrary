import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from "../services/auth-service.service";

/**
 * @description Guardia per la protezione delle rotte che richiedono autenticazione.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  /**
   * @description Costruttore della guardia.
   * @param router Servizio di routing per la navigazione tra le pagine.
   * @param authService Servizio di autenticazione per verificare lo stato dell'utente.
   */
  constructor(private router: Router, private authService: AuthServiceService) {}

  /**
   * @description Verifica se l'utente è autenticato prima di consentire l'accesso a una determinata rotta.
   * @param route Snapshot dell'attuale route attivata.
   * @param state Snapshot dello stato attuale del router.
   * @returns True se l'utente è autenticato, altrimenti reindirizza alla pagina di login.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('Sono la Guardia');

    // Verifica se l'utente è autenticato
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Se l'utente non è autenticato, reindirizza alla pagina di login
      this.router.navigate(['/login']);
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from "../services/auth-service.service";

/**
 * @description Guard for protecting routes that require authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  /**
   * @description Constructor of the guard.
   * @param router Routing service for navigation between pages.
   * @param authService Authentication service to check the user's authentication status.
   */
  constructor(private router: Router, private authService: AuthServiceService) {}

  /**
   * @description Verifies if the user is authenticated before allowing access to a specific route.
   * @param route Snapshot of the current activated route.
   * @param state Snapshot of the current router state.
   * @returns True if the user is authenticated, otherwise redirects to the login page.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('I am the Guard');

    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page
      console.log("AuthGuard test", this.authService.isAuthenticated())
      this.router.navigate(['/login']);
      return false;
    }
  }
}

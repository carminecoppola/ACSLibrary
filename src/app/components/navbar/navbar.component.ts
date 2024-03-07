import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

/**
 * Component for the navigation bar (navbar).
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /** Title displayed in the navbar. */
  title = 'ACLibrary';

  /** Flag indicating whether the user is authenticated. */
  isLoggedIn: boolean = this.authService.isAuthenticated();

  /** Flag indicating whether to show or hide the back button. */
  showBackButton: boolean = false;

  /**
   * Constructor of the component.
   * @param authService Authentication service.
   * @param router Object for navigation between pages.
   * @param location Service for managing location (back navigation).
   */
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private location: Location
  ) {
    // Subscription to navigation events to manage the visibility of the back button
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Update the flag to show or hide the back button based on the current page
        this.showBackButton = this.router.url !== '/login';
      }
    });
  }

  /**
   * Logs out the user and navigates to the login page.
   */
  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Goes back to the previous page.
   */
  goBack() {
    this.showBackButton = true; // Set showBackButton to true
    this.location.back(); // Go back to the previous page
    this.showBackButton = false; // Set showBackButton to false
  }
}

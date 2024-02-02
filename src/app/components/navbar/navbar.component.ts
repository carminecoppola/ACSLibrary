import { Component } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = 'ACLibrary'

  constructor( private authService: AuthServiceService, private router: Router ) {
  }

  logout() {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn:boolean = this.authService.isAuthenticated();


}

import { Component } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.css']
})
export class LibraryListComponent {
  title = 'LibraryProject';


  constructor(private authService:AuthServiceService, private router:Router) {}

  logout(){
    console.log('Logout')
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Inietta il servizio Router e AuthService nel costruttore
  constructor(private router: Router , private authService: AuthServiceService) {}

  messageError: string | null = null;

  submitForm() {
    console.log(this.loginForm.value);

    const {username, password} = this.loginForm.value

    if (this.authService.loginUser(username,password)) {
      // Effettua il routing verso il componente LibraryListComponent
      this.router.navigate(['/library']);
    }else {
      this.messageError= this.authService.getAuthenticationError()
      this.router.navigate(['/'])
    }
  }

}

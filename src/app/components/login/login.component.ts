import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from "../../services/auth-service.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../User";

/**
 * This component handles the login page of the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Form for login containing fields for username and password.
   */
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * Variable used to store any error messages during the login process.
   */
  messageError: string | null = null;

  /**
   * Constructor of the component.
   * @param router Routing service for navigating between application pages.
   * @param authService Authentication service to handle login operations.
   */
  constructor(
    private router: Router,
    private authService: AuthServiceService,
  ) {}

  /**
   * This method handles the submission of the login form.
   * It makes a call to the authentication service to perform login using the data provided in the form.
   * If the login is successful, it redirects the user to the LibraryListComponent page.
   * If the login fails, it displays an error message.
   */
  submitForm() {
    const { username, password } = this.loginForm.value;

    this.authService.getUsers().subscribe({
      next: (res) => {
        console.log("Trying getUser: ", res);
        // Find the user in the result of the authentication service call.
        const findUser = res.find((user: User) => user.username === username && user.password === password);
        console.log("User found", findUser);

        if (findUser) {
          // If the user is found, store their data and redirect to the Library page.
          this.authService.userData = findUser;
          this.router.navigate(['/library']);
        } else {
          // If the user is not found, set an error message.
          this.messageError = "Invalid credentials";
        }
      }
    });
  }
}

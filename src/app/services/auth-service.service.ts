import { Injectable } from '@angular/core';
import { User } from "../components/User";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

/**
 * Authentication service that handles login, logout, and provides authentication information.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  /**
   * Variable to track the state of the logged-in user.
   */
  userData: User | null = null;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Retrieves the list of users from the server.
   * @returns An observable of users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  /**
   * Checks if the user is currently authenticated.
   * @returns true if the user is authenticated, otherwise false.
   */
  isAuthenticated(): boolean {
    return this.userData !== null;
  }

  /**
   * Logs out the user by resetting user data and any error messages.
   */
  logout() {
    this.userData = null;
  }
}

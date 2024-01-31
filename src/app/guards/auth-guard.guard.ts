import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../services/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router, private authService:AuthServiceService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Sono la Guardia')

    if (this.authService.isAuthenticated()){
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false
    }

  }

}

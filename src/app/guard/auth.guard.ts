import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService){}

  canActivate(){
    const currentClient = this.authenticationService.currentClientValue;
    if (currentClient) {
      return true;
    }

    this.router.navigateByUrl('login');
    return false;
  }

}

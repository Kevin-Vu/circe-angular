import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenStorageService } from '../../authentication/auth-token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private translateService: TranslateService,
              private token: AuthTokenStorageService) { }


  handleError(err: any): void {
    if (err.status === 401 && this.token.isJWTExpired()) {
      if (this.router.url !== '/login' && this.router.url !== '/login') {
        // suppression du token
        this.token.deconnexion();
        // redirection vers la page de login
        this.router.navigate(['login']);
      }
      // si c'est juste une erreur de connexion
      // redirection vers la page de login
      this.router.navigate(['login']);
    }

    // Others errors, display an error message
    if (err.error[this.translateService.getDefaultLang()]) {
      this.openSnackBar(err.error[this.translateService.getDefaultLang()]);
    } else {
      this.openSnackBar(err.error.message);
    }
  }

  /**
   * Show an error snackbar
   * @param message : error message
   */
  private openSnackBar(message: string) {
    this.snackBar.open(message, this.translateService.instant('ERROR'), {
      duration: 3000,
    });
  }

}

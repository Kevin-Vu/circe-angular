import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientService } from '../services/client/client.service';
import { take, mergeMap } from 'rxjs/operators';
import { Client } from 'src/app/shared/interfaces/client';
import { AuthTokenStorageService } from '../authentication/auth-token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router,
              readonly clientService: ClientService,
              public stockageTokenService: AuthTokenStorageService){}

  /**
   * Autorise ou non l'accès à un URL donné
   * Autorise l'accès que si l'utilisateur a au moins un des rôles demandés
   * Si l'accès est refusé, renvoie l'utilisateur à la page de login
   * @param route:la route désirée
   * @param state: état du router à un moment donnée
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole: string[] = route.data.expectedRole;
    let hasDroit = false;
    // si l'utilisateur est déconnecté, le renvoyer vers la page de connexion
    if (this.stockageTokenService.getRoles() == null) {
      this.router.navigate(['/login']);
      return false;
    }
    // si la session a expiré, renvoyer vers la page de login
    if (this.stockageTokenService.isJWTExpired()) {
      this.stockageTokenService.deconnexion();
      this.router.navigate(['/login']);
      return false;
    }
    const token = this.stockageTokenService.getRoles().split(',');
    expectedRole.forEach((role) => {
      if (token.includes(role)) {
        hasDroit = true;
      }
    });
   // if (token.includes(DROIT_SUPER_ADMIN)) {
      hasDroit = true;
//    }
    if (hasDroit) {
      return true;
    } else {
      // si l'utilisateur n'a aucun droits parmi tout ceux
      // utilisés par l'app alors renvoie vers la page de login
     /* let noDroit = true;
      DroitAll.forEach((role) => {
        if (token.includes(role)) {
          noDroit = false;
        }
      });
      if (noDroit === true) {
        this.stockageTokenService.deconnexion();
        this.router.navigate(['/login']);
      } else {
        // si l'utilisateur n'a pas les droits, renvoyer vers la page de refus d'accès
        this.router.navigate(['/nav/chiffre-affaire']);
      }*/
      return false;
    }
  }

  /*canActivate(): Observable<boolean> {
    return this.clientService.getCurrentClient().pipe(
      take(1),
      mergeMap((client: Client) => {

        if (client) {
          return of(true);

        } else {
          this.router.navigateByUrl('/login');
          return of(false);
        }
      })
    );
  }*/

}

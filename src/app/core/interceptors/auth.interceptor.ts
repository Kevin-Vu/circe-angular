import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { AuthTokenStorageService } from '../authentication/auth-token-storage.service';

const TOKEN_KEY_HEADER = 'Authorization';

/**
 * Service qui intercepte tous les requêtes HTTP avant de les envoyer
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: AuthTokenStorageService) {
  }

  /**
   * Fonction qui ajoute le bon header correspondant et le token JWT avant l'envoi de
   * la requête HTTP
   * @param req: la requête HTTP interceptée
   * @param next: HTTP handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headerReq = req;
    const token = this.token.getToken();
    if (token !== null) {
      headerReq = req.clone({headers: req.headers.set(TOKEN_KEY_HEADER, 'Bearer ' + token)});
    }

    return next.handle(headerReq);

    // return next.handle(headerReq).pipe(catchError((err) => {
    //   // si la session a expiré
    //   if (err.status === 401 && this.token.isJWTExpired()) {
    //     if (this.router.url !== '/login' && this.router.url !== '/login') {
    //       // suppression du token
    //       this.token.deconnexion();
    //       // redirection vers la page de login
    //       this.router.navigate(['login']);
    //       return of(err);
    //     }
    //     // si c'est juste une erreur de connexion
    //     // redirection vers la page de login
    //     this.router.navigate(['login']);
    //     return of(err);
    //   }
    //   // pour les autres erreurs, renvoyer un message d'erreur
    //   return of(err);
    // }));
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];


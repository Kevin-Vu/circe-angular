import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLES_KEY = 'auth-roles';
const JWT_TIME_KEY = 'jwt-time';

/**
 * Service utilisé pour le stockage et la récupération d'informations d'authentification
 */
@Injectable({
  providedIn: 'root'
})
export class AuthTokenStorageService {
  private authChange = new Subject<boolean>();

  constructor(private route: Router) {
  }

  /**
   * Effacement des données d'authentification
   */
  deconnexion(): void {
    window.localStorage.clear();
    this.authChange.next(false);
    this.route.navigateByUrl('login');
  }

  /**
   * Stockage du token JWT
   * @param token: le token JWT de la session
   */
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
    this.authChange.next(true);
  }

  /**
   * Récupération du token JWT
   */
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Stockage des droits d'accès de l'utilisateur
   * @param roles: les droits d'accès de l'utilisateur
   */
  public saveRoles(roles: string): void {
    window.localStorage.removeItem(ROLES_KEY);
    window.localStorage.setItem(ROLES_KEY, roles);
    this.authChange.next(true);
  }

  /**
   * Récupérer les droits d'accès de l'utilisateur
   */
  public getRoles(): string {
    return localStorage.getItem(ROLES_KEY);
  }

  /**
   * Stockage du login de l'utilisateur
   * @param userLogin: le login de l'utilisateur connecté
   */
  public saveLoginUtilisateur(userLogin: string): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, userLogin);
    this.authChange.next(true);
  }

  /**
   * Récupération du login de l'utilisateur
   */
  public getLoginUtilisateur(): string {
    return localStorage.getItem(USER_KEY);
  }

  /**
   * Stockage du temps de début de connexion
   */
  public saveJWTExpirationTime(): void {
    window.localStorage.removeItem(JWT_TIME_KEY);
    window.localStorage.setItem(JWT_TIME_KEY, moment().valueOf().toString());
    this.authChange.next(true);
  }

  /**
   * Vérification du temps d'expiration du token JWT
   * renvoie true si expiré
   */
  public isJWTExpired(): boolean {
    return moment().valueOf() - Number(localStorage.getItem(JWT_TIME_KEY)) > environment.JWT_TIME_EXPIRATION;
  }

  public getAuthChange(): Observable<boolean> {
    return this.authChange.asObservable();
  }
}

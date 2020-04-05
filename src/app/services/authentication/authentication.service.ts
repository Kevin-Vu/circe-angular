import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/interfaces/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private observableClient: BehaviorSubject<Client>;
  public currentClient: Observable<Client>;

  constructor(private http: HttpClient) {
    this.observableClient = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('currentClient')));
    this.currentClient = this.observableClient.asObservable();
  }


  public get currentClientValue(): Client {
    return this.observableClient.value;
  }


  /**
   * Login
   * @param codeClient : client code
   * @param password : password
   */
  login(codeClient: string, password: string): Observable<Client> {

    const params = new HttpParams()
                        .set('username', codeClient)
                        .set('password', password);
    return this.http.post<Client>(environment.BACKEND_URL + '/api/login', params);
  }

  /**
   * Logout
   */
  logout(): Observable<any> {
    localStorage.removeItem('currentClient');
    this.observableClient.next(null);
    return this.http.post<any>(environment.BACKEND_URL + '/api/auth/logout', null);
  }

}

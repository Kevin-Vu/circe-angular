import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(environment.BACKEND_URL + '/api/logout', null);
  }

}

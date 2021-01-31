import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  login(loginV: string, passwordV: string): Observable<any> {
    return this.http.post(environment.BACKEND_URL + '/api/sign-in', {
      login: loginV,
      password: passwordV
    }, httpOptions);
  }

}

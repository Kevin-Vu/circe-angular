import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { share, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

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
   * Get a client
   * @param clientCode : client code
   */
  getClientBack(clientCode: string): Observable<Client> {
    const param = new HttpParams().set('clientCode', clientCode);
    return this.http.get<Client>(environment.BACKEND_URL + '/api/auth/client', { params : param });
  }

  /**
   * Get client BehaviorSubject
   */
  getClient(): BehaviorSubject<Client> {
    return this.observableClient;
  }

  /**
   * Set client
   * @param client : Client
   */
  setClient(client: Client): void {
    this.observableClient.next(client);
  }
}

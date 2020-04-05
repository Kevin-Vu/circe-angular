import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientService } from '../services/client/client.service';
import { take, mergeMap } from 'rxjs/operators';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              readonly clientService: ClientService){}

  canActivate(): Observable<boolean> {
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
  }

}

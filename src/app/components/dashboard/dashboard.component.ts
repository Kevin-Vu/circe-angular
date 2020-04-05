import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout().subscribe(
      _ => {
        this.clientService.setClient(null);
        this.router.navigateByUrl('login');
      }
    );
  }

}

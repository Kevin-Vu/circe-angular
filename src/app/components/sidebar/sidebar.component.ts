import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  matListItemClicked: number;

  constructor(
    private authenticationService: AuthenticationService,
    private clientService: ClientService,
    private router: Router) {
      this.matListItemClicked = 0;
  }

  ngOnInit(): void {
  }

  goToMatItem(index: number): void {
    this.matListItemClicked = index;
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

import { Component, OnInit } from '@angular/core';
import { AuthTokenStorageService } from 'src/app/core/authentication/auth-token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  matListItemClicked: number;

  constructor(
    private authenticationService: AuthTokenStorageService) {
      this.matListItemClicked = 0;
  }

  ngOnInit(): void {
  }

  goToMatItem(index: number): void {
    this.matListItemClicked = index;
  }

  /*logout(): void {
    this.authenticationService.logout().subscribe(
      _ => {
        this.clientService.setClient(null);
        this.router.navigateByUrl('login');
      }
    );
  }*/

  /**
   * Logout
   */
  logout(): void {
    this.authenticationService.deconnexion();
  }
}

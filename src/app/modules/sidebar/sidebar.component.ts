import { Component, OnInit } from '@angular/core';
import { AuthTokenStorageService } from 'src/app/core/authentication/auth-token-storage.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [MatSidenavContainer, MatSidenav, MatNavList, MatListItem, NgStyle, MatIcon, MatToolbar, MatToolbarRow, RouterOutlet]
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

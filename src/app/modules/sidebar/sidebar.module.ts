import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar.component';
import { SidebarRoutingModule } from './sidebar.router.module';


import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        SidebarRoutingModule,
        MatListModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        SidebarComponent
    ]
})
export class SidebarModule { }

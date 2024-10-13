import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './modules/login/login.component';


export const APP_ROUTES: Routes = [
  {
      path      : '',
      pathMatch : 'full',
      redirectTo: 'login',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      expectedRole: ['RIGHT_ADMIN'],
    },
    loadComponent: () =>
    import('./modules/sidebar/sidebar.component').then(m => m.SideBarComponent)
  },
  {
      path      : 'login',
      component : LoginComponent
  }

];


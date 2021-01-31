import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './modules/login/login.component';



const routes: Routes = [
  {
      path      : '',
      pathMatch : 'full',
      redirectTo: 'login',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./modules/sidebar/sidebar.module').then(m => m.SidebarModule)
  },
  {
      path      : 'login',
      component : LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

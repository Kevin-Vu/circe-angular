import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
      path      : '',
      pathMatch : 'full',
      redirectTo: 'login',
  },
  {
      path      : 'dashboard',
      component : DashboardComponent,
      canActivate: [AuthGuard]

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

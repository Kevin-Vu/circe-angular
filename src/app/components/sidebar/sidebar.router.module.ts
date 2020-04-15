import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';


const routes: Routes = [
  {
    path: 'tabs',
    component: SidebarComponent,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule {
}

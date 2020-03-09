import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/welcome', data: {breadcrumb: 'Home'} },

//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
//   { path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule) },
//   { path: 'experiment', loadChildren: () => import('./experiment/experiment.module').then(m => m.ExperimentModule) }
// ];

const routes: Routes = [
  { path: '',  data: {breadcrumb: 'Home'}, children: [
    { 
      path: '', component: HomeComponent, data: {skip: true}
    },
    {
      path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
      data: {skip: true}
    },
    {
      path: 'super-admin', loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
      data: {skip: false, breadcrumb: 'Super-Admin'}},
    {
      path: 'experiment', loadChildren: () => import('./experiment/experiment.module').then(m => m.ExperimentModule),
      data: {skip: false, breadcrumb: 'Experiment'}
    }
  ]},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

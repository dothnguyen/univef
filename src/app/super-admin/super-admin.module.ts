import { NgModule } from '@angular/core';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { GroupsComponent } from './pages/groups/groups.component';


@NgModule({
  imports: [SuperAdminRoutingModule],
  declarations: [
    GroupsComponent
  ],
  exports: [
    GroupsComponent
  ]
})
export class SuperAdminModule { }

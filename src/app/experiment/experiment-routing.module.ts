import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';
import { FormExperimentComponent } from './pages/form-experiment/form-experiment.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';




const routes: Routes = [

  { path: '', children: [
    { path: '', redirectTo: '/maps', pathMatch: 'full'},
    { path: 'maps', component: MapExperimentComponent, data: {breadcrumb: 'Maps'} },
    { path: 'groups', component: GroupsExperimentComponent, data: {breadcrumb: 'Groups'} },
    {
      path: 'groups/:id/settings',
      component: GroupSettingsComponent, data: {breadcrumb: 'Group Settings'}
    },
    { path: 'forms', component: FormExperimentComponent, data: {breadcrumb: 'Dynamic Forms'}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule { }

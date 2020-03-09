import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';
import { FormExperimentComponent } from './pages/form-experiment/form-experiment.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ExperimentComponent } from './pages/experiment/experiment.component';




const routes: Routes = [

  { path: '', component: ExperimentComponent,  data: {breadcrumb: 'Experiment', skip: true}, children: [
    { path: 'maps', component: MapExperimentComponent, data: {breadcrumb: 'Maps'}},
    { path: 'groups', data: {breadcrumb: 'Groups'}, component: GroupsExperimentComponent, children: [
      {
        path: '',
        component: GroupListComponent, data: {skip: true}
      },
      {
        path: 'settings/:id',
        component: GroupSettingsComponent, data: {breadcrumb: 'Group Settings'}
      },
    ]},
    { path: 'forms', component: FormExperimentComponent, data: {breadcrumb: 'Dynamic Forms'}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule { }

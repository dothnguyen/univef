import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';
import { FormExperimentComponent } from './pages/form-experiment/form-experiment.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { GroupListComponent } from './group-list/group-list.component';
import { ExperimentComponent } from './pages/experiment/experiment.component';




const routes: Routes = [

  { path: '', component: ExperimentComponent, data: {breadcrumb: 'Experiment', skip: true}, children: [
    { path: 'maps', component: MapExperimentComponent, data: {breadcrumb: 'Maps', skip: false}},
    { path: 'groups', data: {breadcrumb: 'Groups', skip: false}, children: [
      {
        path: '',
        component: GroupListComponent, data: {skip: true}
      },
      {
        path: 'settings/:id',
        component: GroupSettingsComponent, data: {breadcrumb: 'Group Settings', skip: false}
      },
    ]},
    { path: 'forms', component: FormExperimentComponent, data: {breadcrumb: 'Dynamic Forms', skip: false}},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule { }

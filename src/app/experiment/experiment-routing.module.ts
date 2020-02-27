import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';




const routes: Routes = [
  { path: '', component: MapExperimentComponent },
  { path: 'maps', component: MapExperimentComponent },
  { path: 'groups', component: GroupsExperimentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule { }

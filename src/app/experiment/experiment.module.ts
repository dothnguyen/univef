import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExperimentRoutingModule } from './experiment-routing.module';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ExperimentRoutingModule
  ],
  declarations: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent,
    GroupsExperimentComponent,
    GroupListComponent
  ],
  exports: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent,
    GroupsExperimentComponent,
    GroupListComponent
  ]
})
export class ExperimentModule { }

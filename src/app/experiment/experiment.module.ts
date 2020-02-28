import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExperimentRoutingModule } from './experiment-routing.module';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupsExperimentComponent } from './pages/groups-experiment/groups-experiment.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { GroupFormComponent } from './group-form/group-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ExperimentRoutingModule
  ],
  declarations: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent,
    GroupsExperimentComponent,
    GroupListComponent,
    GroupFormComponent
  ],
  exports: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent,
    GroupsExperimentComponent,
    GroupListComponent,
    GroupFormComponent
  ],
  entryComponents: [
    GroupFormComponent
  ]
})
export class ExperimentModule { }

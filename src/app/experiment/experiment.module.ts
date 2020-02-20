import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExperimentRoutingModule } from './experiment-routing.module';
import { MapExperimentComponent } from './pages/map-experiment/map-experiment.component';


@NgModule({
  imports: [
    CommonModule,
    ExperimentRoutingModule
  ],
  declarations: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent
  ],
  exports: [
    MapComponent,
    DynamicFormComponent,
    MapExperimentComponent
  ]
})
export class ExperimentModule { }

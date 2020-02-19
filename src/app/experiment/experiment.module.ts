import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MapComponent,
    DynamicFormComponent
  ],
  exports: [
    MapComponent,
    DynamicFormComponent
  ]
})
export class ExperimentModule { }

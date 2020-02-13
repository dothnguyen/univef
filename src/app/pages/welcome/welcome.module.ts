import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { ExperimentModule } from 'src/app/experiment/experiment.module';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    ExperimentModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }

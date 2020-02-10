import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './header/header.component';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { from } from 'rxjs';
import { SidemenuComponent } from './sidemenu/sidemenu.component';


@NgModule({
  imports: [
    NgZorroAntdModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    SidemenuComponent
  ],
  exports: [
    HeaderComponent,
    SidemenuComponent
  ]
})
export class SharedModule { }

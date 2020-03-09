import { Component, ViewChild, ViewContainerRef, AfterViewInit, OnInit } from '@angular/core';
import { BreadcrumbService } from './core/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isCollapsed = false;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngAfterViewInit() {

  }

  reloadMenu() {

  }

}

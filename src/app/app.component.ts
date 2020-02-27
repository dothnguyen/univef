import { Component, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isCollapsed = false;

  constructor() {}

  ngAfterViewInit() {

  }

  reloadMenu() {

  }

}

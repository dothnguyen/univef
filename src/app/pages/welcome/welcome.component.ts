import { Component, OnInit } from '@angular/core';

import { ZoomLocation } from '../../core/models/map.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  zoomLocation: ZoomLocation = {
    name: 'default',
    coord: { lat: 10.7546658, lng: 106.4143583 },
    zoomLevel: 7
  };

  constructor() { }

  ngOnInit() {
  }

}

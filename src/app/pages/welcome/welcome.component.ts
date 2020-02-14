import { Component, OnInit } from '@angular/core';

import { ZoomLocation } from '../../core/models/map.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  defaultLocation: ZoomLocation = {
    name: 'default',
    coord: { lat: -27.4626137, lng: 153.0211694 },
    zoomLevel: 7
  };

  zoomLocations: ZoomLocation[]= [
    {
      name: 'Gold Coast	',
      coord: { lat: -28.0781502, lng: 153.411162 },
      zoomLevel: 14
    },
    {
      name: 'Darwin City',
      coord: { lat: -12.4644799, lng: 130.8433367 },
      zoomLevel: 14
    },
    {
      name: 'Townsville	',
      coord: { lat: -19.259, lng: 146.8169 },
      zoomLevel: 14
    },
    {
      name: 'Airlie Beach	',
      coord: { lat: -20.2779275, lng: 148.691019399999 },
      zoomLevel: 14
    }
  ];



  constructor() { }

  ngOnInit() {
  }

  changeLocation() {
    this.defaultLocation = {
      name: 'Townsville	',
      coord: { lat: -20.2779275, lng: 148.691019399999 },
      zoomLevel: 14
    };
  }
}

import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';

import { ZoomLocation } from '../../core/models/map.model';

import * as L from 'leaflet';

@Component({
  selector: '[map-component]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  mapId: string;
  map: any;

  @Input('defaultLocation') defaultLocation: ZoomLocation;

  @Input('zoomLocations') zoomLocations: ZoomLocation[];

  constructor(element: ElementRef) {
      console.log(element.nativeElement);
      if (!element.nativeElement.id) {
        element.nativeElement.id =  new Date().getTime().toString();
      }

      this.mapId = element.nativeElement.id;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map(this.mapId, {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}

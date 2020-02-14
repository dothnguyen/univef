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

  private _defaultLocation:ZoomLocation;
  get defaultLocation() {
    return this._defaultLocation;
  }

  @Input('defaultLocation')
  set defaultLocation(val: ZoomLocation) {
    this._defaultLocation = val;
    // regenerate the default location
    this.changeDefaultLocation();
  }

  private _zoomLocations: ZoomLocation[];
  get zoomLocations() {
    return this._zoomLocations;
  }

  @Input('zoomLocations')
  set zoomLocations(val: ZoomLocation[]) {
    this._zoomLocations = val;

    this.buidLocationDropdown();
  }

  zoomDropdownContainer: L.Control;

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
    var center = new L.LatLng(39.8282, -98.5795);
    var zoomLevel = 3;
    if (this._defaultLocation) {
      center = new L.LatLng(this._defaultLocation.coord.lat, this._defaultLocation.coord.lng);
      zoomLevel = this._defaultLocation.zoomLevel;
    }

    this.map = L.map(this.mapId, {
      center: center,
      zoom: zoomLevel
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    if (this._zoomLocations) {
      this.buidLocationDropdown();
    }
  }

  private changeDefaultLocation() {
    if (this.map && this._defaultLocation) {
      this.map.setView([this._defaultLocation.coord.lat, this._defaultLocation.coord.lng],
                        this._defaultLocation.zoomLevel);
    }
  }

  private buidLocationDropdown() {
    if (!this.map)
      return;

    if (this.zoomDropdownContainer) {
      this.zoomDropdownContainer.remove();
    }

    if (!this.zoomLocations || this.zoomLocations.length < 0) {
      this.zoomDropdownContainer = new L.Control({position: 'bottomright'});

      this.zoomDropdownContainer.onAdd = (map: L.Map): HTMLElement => {
          var div = L.DomUtil.create('div', 'info legend');

          var dropDownContent = '<select id="ZoomLocationDropdown" class="form-control">';
          if (this._defaultLocation)
            dropDownContent += `<option data-zoom="${this._defaultLocation.zoomLevel}" data-long="${this._defaultLocation.coord.lng}" data-lat="' + this._defaultLocation.coord.lat + '">${this._defaultLocation.name}</option>`;
          this._zoomLocations.forEach(zoom => {
            dropDownContent += `<option data-zoom="${zoom.zoomLevel}" data-long="${zoom.coord.lng}" data-lat="${zoom.coord}">${zoom.name}</option>`;
          });

          dropDownContent += '</select>';
          div.innerHTML = dropDownContent;

          //div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
          //div.firstChild.

          return div;
      }

      this.zoomDropdownContainer.addTo(this.map);
    }

  }

}

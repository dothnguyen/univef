import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ZoomLocation } from '../../core/models/map.model';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'map-component, [map-component]',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  mapId: string;
  map: any;

  private _defaultLocation: ZoomLocation;
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

  private _showMarker: boolean = false;
  get showMarker() { return this._showMarker;}
  @Input('showMarker')
  set showMarker(show: boolean) {
    this._showMarker = show;

    // initialize marker
    this.initMarker();
  }

  private _markerLocation: L.LatLngTuple;
  get markerLocation() { return this._markerLocation; }
  @Input('markerLocation')
  set markerLocation(loc: L.LatLngTuple) {
    this._markerLocation = loc;

    // display marker
    this.changeMarkerLocation();
  }

  zoomDropdownContainer: L.Control;
  marker: L.Marker;

  constructor(element: ElementRef) {
    if (!element.nativeElement.id) {
      element.nativeElement.id = new Date().getTime().toString();
    }

    this.mapId = element.nativeElement.id;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    let center = new L.LatLng(39.8282, -98.5795);
    let zoomLevel = 3;
    if (this._defaultLocation) {
      center = new L.LatLng(
        this._defaultLocation.coord.lat,
        this._defaultLocation.coord.lng
      );
      zoomLevel = this._defaultLocation.zoomLevel;
    }

    this.map = L.map(this.mapId, {
      center,
      zoom: zoomLevel
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    tiles.addTo(this.map);

    if (this._zoomLocations) {
      this.buidLocationDropdown();
    }

    if (this._showMarker) {
      this.initMarker();
    }
  }

  private changeDefaultLocation() {
    if (this.map && this._defaultLocation) {
      this.map.setView(
        [this._defaultLocation.coord.lat, this._defaultLocation.coord.lng],
        this._defaultLocation.zoomLevel
      );
    }
  }

  private buidLocationDropdown() {
    if (!this.map) {
      return;
    }

    if (this.zoomDropdownContainer) {
      this.zoomDropdownContainer.remove();
    }

    if (this.zoomLocations && this.zoomLocations.length > 0) {
      this.zoomDropdownContainer = new L.Control({ position: 'bottomright' });

      this.zoomDropdownContainer.onAdd = (map: L.Map): HTMLElement => {
        const div = L.DomUtil.create('div', 'zoomto-outer');
        div.insertAdjacentHTML('beforeend', '<span>Zoom To</span>');
        let dropDownContent = '<select id="ZoomLocationDropdown">';

        if (this._defaultLocation) {
          dropDownContent += `<option data-zoom="${this._defaultLocation.zoomLevel}"
                              data-long="${this._defaultLocation.coord.lng}"
                              data-lat="${this._defaultLocation.coord.lat}">${this._defaultLocation.name}</option>`;
        }

        this._zoomLocations.forEach(zoom => {
          dropDownContent += `<option data-zoom="${zoom.zoomLevel}" data-long="${zoom.coord.lng}"
                              data-lat="${zoom.coord.lat}">${zoom.name}</option>`;
        });

        dropDownContent += '</select>';
        div.insertAdjacentHTML('beforeend', dropDownContent);

        div
          .querySelector('#ZoomLocationDropdown')
          .addEventListener('change', e => {
            const ele = e.currentTarget as HTMLSelectElement;
            const opt = ele.querySelector('option:checked') as HTMLElement;

            const zoom = opt.dataset.zoom;
            const lat = opt.dataset.lat;
            const lng = opt.dataset.long;

            this.map.setView([lat, lng], zoom);
          });

        div.addEventListener('mousedown', L.DomEvent.stopPropagation);
        div.addEventListener('dblclick', L.DomEvent.stopPropagation);

        return div;
      };

      this.zoomDropdownContainer.addTo(this.map);
    }
  }

  private initMarker() {
    if (!this.map) {
      return;
    }

    if (!this.marker) {
      this.marker = new L.Marker(this._markerLocation ? this._markerLocation : this._defaultLocation.coord);
      this.map.on('click', this.onMapClick.bind(this));
    }

    // set location if any
    this.changeMarkerLocation();
  }

  private onMapClick(e: L.LeafletMouseEvent) {
    if (this._showMarker) {
      this._markerLocation = [e.latlng.lat, e.latlng.lng];
      this.changeMarkerLocation();
    }
  }

  private changeMarkerLocation() {
    if (!this.map) {
      return;
    }

    if (!this.marker) {
      return;
    }

    if (this._markerLocation) {
      this.marker.setLatLng(this._markerLocation);
      this.marker.addTo(this.map);
    } else {
      this.marker.removeFrom(this.map);
    }
  }
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location {
  name: string;
  coord: LatLng;
}

export interface ZoomLocation extends Location {
  zoomLevel: number;
}

import { LatLng, Marker, Polyline } from 'models';

export type AppMode = 'rankings' | 'search' | 'season' | 'hurricane';

class AppMapState {
  center: LatLng;
  zoom: number;
  markers: Marker[];
  polylines: Polyline[];
}

class AppState {
  mode: AppMode;
  map: AppMapState;
}

export { AppState, AppMapState }

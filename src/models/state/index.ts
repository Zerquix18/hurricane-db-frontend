import { LatLng, Marker, Polyline } from 'models';
import { Hurricane } from 'models/database';

// export type AppMode = 'rankings' | 'search' | 'season' | 'hurricane' | null;

interface AppModeNone {
  mode: null;
}

interface AppModeHurricane {
  mode: 'hurricane';
  hurricane: Hurricane | null;

  loadedHurricane: boolean;
  error: string;
}

interface AppModeSeason {
  mode: 'season';

  hurricanes: Hurricane[] | null;
  loadedSeason: boolean;
  loadedPositions: boolean;
  loadedWindSpeeds: boolean;

  error: string;
}

type AppMode = AppModeNone | AppModeHurricane | AppModeSeason;

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

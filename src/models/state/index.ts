import { LatLng, Marker, Polyline } from 'models';
import { Hurricane, Season } from 'models/database';

export interface AppModeNone {
  mode: null;
}

export interface AppModeHurricane {
  mode: 'hurricane';
  hurricane: Hurricane | null;
  loading: boolean;
  error: string;
}

export interface AppModeSeason {
  mode: 'season';
  season: Season | null;
  loading: boolean;
  error: string;
}

export type AppMode = AppModeNone | AppModeHurricane | AppModeSeason;

export interface AppMapState {
  center: LatLng;
  zoom: number;
  markers: Marker[];
  polylines: Polyline[];
  loaded: boolean;
}

export type SpeedUnit = 'kt' | 'kmh' | 'mph';
export type PressureUnit = 'mb' | 'kpa' | 'atm';
export type DistanceUnit = 'km' | 'mi' | 'm';

export interface AppSettingsState {
  units: {
    speed: SpeedUnit;
    pressure: PressureUnit;
    distance: DistanceUnit;
  }
}

export interface AppState {
  mode: AppMode;
  map: AppMapState;
  settings: AppSettingsState;
}

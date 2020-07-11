export * from './maps';
export * from './database';
export * from './state';

// misc

export interface SearchParams {
  name?: string;
  season?: string;
  affected_area?: string;
  sort_by?: string;
  min_speed?: string;
  max_speed?: string;
  min_pressure?: string;
  max_pressure?: string;
  min_deaths?: string;
  max_deaths?: string;
  min_damage?: string;
  max_damage?: string;
  min_ace?: string;
  max_ace?: string;
  min_distance_traveled?: string;
  max_distance_traveled?: string;
  min_formation_month?: string;
  max_formation_month?: string;
  sw_lat?: string;
  sw_lng?: string;
  ne_lat?: string;
  ne_lng?: string;
}

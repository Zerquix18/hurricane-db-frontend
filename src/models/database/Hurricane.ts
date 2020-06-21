import { HurricanePosition, HurricaneWindSpeed, HurricanePressure, HurricaneAffectedArea } from 'models';

export type Basin = 'atlantic' | 'eatern_pacific' | 'western_pacific' | 'southern_pacific' | 'indian' | 'australian_region';

class Hurricane {
  id: number;
  name: string;
  image_url: string | null;
  basin: Basin;
  season: number;
  description: string | null;
  description_source: string | null;

  formed: string; // a Date string
  dissipated: string; // a Date string

  min_range_fatalities: number | null;
  max_range_fatalities: number | null;
  min_range_damage: number | null;
  max_range_damage: number | null;

  sources: string;

  created_at: string; // a Date string
  updated_at: string; // a Date string

  lowest_pressure: number | null;
  highest_pressure: number | null;
  lowest_windspeed: number | null;
  highest_windspeed: number | null;
  distance_traveled: number | null;
  ace: number | null;

  positions: HurricanePosition[] | null;
  windspeeds: HurricaneWindSpeed[] | null;
  pressures: HurricanePressure[] | null;
  affected_areas: HurricaneAffectedArea[] | null;
}

export default Hurricane;

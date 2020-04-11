import { Hurricane } from 'models';

interface SeasonBoundaries {
  first_system_formed_on: string;
  last_system_dissipated_on: string;
}

interface SeasonStatistics {
  total_systems: number;
  total_storms: number;
  total_huriccanes: number;
  total_major_hurricanes: number;
  total_damage: number;
  total_fatalities: number;
}

class Season {
  boundaries: SeasonBoundaries;
  statistics: SeasonStatistics;
  strongest_storm: Hurricane;
  systems: Hurricane[];
}

export default Season;

// explanation here: https://www.nhc.noaa.gov/data/hurdat/hurdat2-format-atlantic.pdf
type HurricanePositionEventType = 'C' | 'G' | 'I' | 'L' | 'P' | 'R' | 'S' | 'T' | 'W';
type HurricanePositionClassification = 'TD' | 'TS' | 'HU' | 'EX' | 'SD' | 'SS' | 'LO' | 'WV' | 'DB';

class HurricanePosition {
  id: number;
  hurricane_id: number;

  latitude: number;
  longitude: number;

  moment: string; // a Date string

  event_type: HurricanePositionEventType | null;
  classification: HurricanePositionClassification;

  source: string;

  created_at: string; // a Date string
  updated_at: string; // a Date string
}

export default HurricanePosition;

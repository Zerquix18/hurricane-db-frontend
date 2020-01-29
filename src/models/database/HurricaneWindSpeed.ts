class HurricaneWindSpeed {
  id: number;
  hurricane_id: number;
  position_id: number;

  measurement: number;
  moment: string; // a Date string

  source: string | null;

  created_at: string; // a Date string
  updated_at: string; // a Date string
}

export default HurricaneWindSpeed;

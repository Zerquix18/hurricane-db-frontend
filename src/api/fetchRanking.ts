type Ranking = (
  'top_by_lowest_pressure' |
  'top_by_highest_windspeed' |
  'top_by_fatalities' |
  'top_by_damage' |
  'top_by_month' |
  'top_by_season' |
  'top_by_fastest_movement' |
  'top_by_largest_path' |
  'top_by_landfalls' |
  'earliest_formation_by_category' |
  'latest_formation_by_category'
);

const fetchRanking = async (ranking: Ranking): Promise<any> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}ranking/${ranking}`;

  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default fetchRanking;

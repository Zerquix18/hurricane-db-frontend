import { Season } from 'models';

// wrap this with a try/catch
const fetchSeason = async (basin: string, season: number): Promise<Season> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}basin/${basin}/season/${season}`;

  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default fetchSeason;

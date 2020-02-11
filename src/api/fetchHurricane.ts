import { Hurricane } from "models";

// wrap this with a try/catch
const fetchHurricane = async (basin: string, season: number, name: string): Promise<Hurricane> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}basin/${basin}/season/${season}/hurricane/${name}`;

  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default fetchHurricane;

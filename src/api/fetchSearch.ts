import { Hurricane, SearchParams } from "models";

// wrap this with a try/catch
const fetchSearch = async (search: string): Promise<Hurricane[]> => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const url = `${baseUrl}search${search}`;

  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export default fetchSearch;

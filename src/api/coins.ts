import { API_HOST } from '../utils/constants';

export async function get(url: string) {
  try {
    const host = `${API_HOST}`;
    const response = await fetch(`${host}/${url}`);
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error(`Error in API GET request: ${err}`);
  }
}


import APIClient from '../API/API';
import { Line } from '../types';

export const requestLines = async (accessToken: string): Promise<Line[]> => {
  const response = await APIClient.get('/lines', accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

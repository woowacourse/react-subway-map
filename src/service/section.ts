import APIClient from '../API/API';
import { LineId } from '../types';

export const requestSection = async (accessToken: string, lineId: LineId) => {
  const response = await APIClient.get(`/lines/${lineId}`, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

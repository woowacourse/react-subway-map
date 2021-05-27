import APIClient from '../API/API';
import { LineId, StationId } from '../types';

export const requestSection = async (lineId: LineId, accessToken: string) => {
  const response = await APIClient.get(`/lines/${lineId}`, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

export const requestDeleteSection = async (
  lineId: LineId,
  stationId: StationId,
  accessToken: string
) => {
  const response = await APIClient.delete(
    `/lines/${lineId}/sections?stationId=${stationId}`,
    accessToken
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText);
  }
};

import APIClient from '../../API/API';
import { StationId, Station, StationForm } from '../../types';

export const requestStations = async (
  accessToken: string
): Promise<Station[]> => {
  const response = await APIClient.get('/stations', accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

export const requestAddStation = async (
  form: StationForm,
  accessToken: string
) => {
  const response = await APIClient.post('/stations', form, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

export const requestDeleteStation = async (
  stationId: StationId,
  accessToken: string
) => {
  const response = await APIClient.delete(
    `/stations/${stationId}`,
    accessToken
  );

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }
};

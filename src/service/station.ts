import APIClient from '../API/API';
import { StationForm } from '../types';

export const requestStations = async (accessToken: string) => {
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

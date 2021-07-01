import APIClient from '../../API/API';
import { Line, LineForm, LineId } from '../../types';

export const requestLines = async (accessToken: string): Promise<Line[]> => {
  const response = await APIClient.get('/lines', accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

export const requestAddLine = async (
  form: LineForm,
  accessToken: string
): Promise<Line> => {
  const response = await APIClient.post('/lines', form, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

export const requestDeleteLine = async (
  lineId: LineId,
  accessToken: string
): Promise<void> => {
  const response = await APIClient.delete(`/lines/${lineId}`, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }
};

import APIClient from '../../API/API';

export const requestMap = async (accessToken: string) => {
  const response = await APIClient.get(`/maps`, accessToken);

  if (!response.ok) {
    const responseText = await response.text();

    throw new Error(responseText);
  }

  return response.json();
};

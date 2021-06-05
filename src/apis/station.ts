import axios from "axios";

import { Station } from "../@types/types";

export const requestStation = {
  async getAllStation() {
    const response = await axios.get<Station[]>("/stations");

    return response.data;
  },
  async addStation(stationName: string) {
    const response = await axios.post<Station>("/stations", {
      name: stationName,
    });

    return response.data;
  },
  async deleteStation(id: number) {
    const response = await axios.delete(`/stations/${id}`);

    return response;
  },
};

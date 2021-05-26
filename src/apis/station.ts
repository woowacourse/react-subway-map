import axios from "axios";

import { Station } from "../@types/types";
// TODO : axios 가 실패했을 때 response 에는 무엇이 담기는지 확인하기

export const requestStation = {
  async getAllStation() {
    const response = await axios.get<Station[]>("https://subway-pomo.kro.kr/stations");

    return response.data;
  },
  async addStation(stationName: string) {
    const response = await axios.post<Station>("https://subway-pomo.kro.kr/stations", {
      name: stationName,
    });

    return response.data;
  },
  async deleteStation(id: number) {
    const response = await axios.delete(`https://subway-pomo.kro.kr/stations/${id}`);

    return response;
  },
};

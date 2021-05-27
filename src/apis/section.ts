import axios from "axios";

import { SectionAddRequestItem } from "../@types/types";

export const requestSection = {
  async addSection({ lineId, upStationId, downStationId, distance }: SectionAddRequestItem & { lineId: number }) {
    const response = await axios.post(`https://subway-pomo.kro.kr/lines/${lineId}/sections`, {
      upStationId,
      downStationId,
      distance,
    });

    return response;
  },
  async deleteSection({ lineId, stationId }: { lineId: number; stationId: number }) {
    const response = await axios.delete(`https://subway-pomo.kro.kr/lines/${lineId}/sections?${stationId}`);

    return response;
  },
};

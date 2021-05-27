import axios from "axios";

import { SectionAddRequestItem } from "../@types/types";

export const requestSection = {
  async addSection({ lineId, upStationId, downStationId, distance }: SectionAddRequestItem & { lineId: number }) {
    const response = await axios.post(`/lines/${lineId}/sections`, {
      upStationId,
      downStationId,
      distance,
    });

    return response;
  },
  async deleteSection({ lineId, stationId }: { lineId: number; stationId: number }) {
    const response = await axios.delete(`/lines/${lineId}/sections?stationId=${stationId}`);

    return response;
  },
};

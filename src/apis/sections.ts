import { request } from "./request";
import { SectionAddRequestItem } from "../@types";

const sections = {
  addSection: ({
    lineId,
    upStationId,
    downStationId,
    distance,
  }: SectionAddRequestItem & { lineId: number }) => {
    return request(`/lines/${lineId}/sections`, {
      method: "post",
      data: { upStationId, downStationId, distance },
    });
  },

  deleteSection: ({
    lineId,
    stationId,
  }: {
    lineId: number;
    stationId: number;
  }) => {
    return request(`/lines/${lineId}/sections?stationId=${stationId}`, {
      method: "delete",
    });
  },
};

export { sections };

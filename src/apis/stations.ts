import { request } from "./request";

import { Station } from "../types/station";

const stations = {
  getAllStation: () => {
    return request<Station[]>("/stations");
  },

  addStation: (stationName: string) => {
    return request<Station>("/stations", {
      method: "post",
      data: {
        name: stationName,
      },
    });
  },

  deleteStation: (id: number) => {
    return request(`/stations/${id}`, { method: "delete" });
  },
};

export { stations };

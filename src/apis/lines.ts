import { request } from "./request";
import { Line, LineAddRequestItem } from "../@types";

const lines = {
  getAllLines: () => {
    return request<Line[]>("/lines");
  },

  addLine: (line: LineAddRequestItem) => {
    return request<Line>("/lines", {
      method: "post",
      data: line,
    });
  },

  deleteLine: (id: number) => {
    return request(`/lines/${id}`, { method: "delete" });
  },
};

export { lines };

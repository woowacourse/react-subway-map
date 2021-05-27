import axios from "axios";

import { Line, LineAddRequestItem } from "../@types/types";

export const requestLine = {
  async getAllLines() {
    const response = await axios.get<Line[]>("https://subway-pomo.kro.kr/lines");

    return response.data;
  },
  async addLine(line: LineAddRequestItem) {
    const response = await axios.post<Line>("https://subway-pomo.kro.kr/lines", line);

    return response.data;
  },
  async deleteLine(id: number) {
    const response = await axios.delete(`https://subway-pomo.kro.kr/lines/${id}`);

    return response;
  },
};

import axios from "axios";

import { Line, LineAddRequestItem } from "../@types";

const requestLine = {
  async getAllLines() {
    const response = await axios.get<Line[]>("/lines");

    return response.data;
  },
  async addLine(line: LineAddRequestItem) {
    const response = await axios.post<Line>("/lines", line);

    return response.data;
  },
  async deleteLine(id: number) {
    const response = await axios.delete(`/lines/${id}`);

    return response;
  },
};

export { requestLine };

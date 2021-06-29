import axios from "axios";
import { Line } from "../@types/types";

export const requestSubwayMap = {
  async getSubwayMap() {
    const response = await axios.get<Line[]>("/lines/map");

    return response.data;
  },
};

import { stations, lines } from "./data";

const initialState = {
  auth: {
    error: null,
    isAuthenticated: false,
  },
  line: {
    loading: false,
    items: lines,
    error: null,
  },
  station: {
    loading: false,
    items: stations,
    error: null,
  },
};

export default initialState;

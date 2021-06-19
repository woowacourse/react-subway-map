import { stations, lines } from "./data";

const initialState = {
  auth: {
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  line: {
    items: lines,
    loading: false,
    error: null,
  },
  station: {
    items: stations,
    loading: false,
    error: null,
  },
};

export default initialState;

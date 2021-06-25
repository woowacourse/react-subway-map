import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { COLOR } from "./constants/color";
import GlobalStyle from "./Global.styles";
import store from "./modules";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL, DEFAULT_API_PROVIDER } from "./apis";

export const theme = {
  PRIMARY: COLOR.CYAN_300,
  MAIN_TEXT_COLOR: COLOR.GRAY_900,
  SUB_TEXT_COLOR: COLOR.GRAY_500,
  BACKGROUND_COLOR: COLOR.GRAY_200,
  DANGER_TEXT_COLOR: COLOR.RED_500,
};

axios.defaults.baseURL = BASE_URL[DEFAULT_API_PROVIDER];

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { store } from "./modules/store";
import { Provider } from "react-redux";
import { COLOR } from "./constants/color";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Global.styles";

export const theme = {
  PRIMARY: COLOR.CYAN_300,
  MAIN_TEXT_COLOR: COLOR.GRAY_900,
  SUB_TEXT_COLOR: COLOR.GRAY_500,
  BACKGROUND_COLOR: COLOR.GRAY_200,
  DANGER_TEXT_COLOR: COLOR.RED_500,
};

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

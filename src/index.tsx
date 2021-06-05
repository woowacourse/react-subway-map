import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import store from "./modules";

import App from "./App";
import Select from "./components/Select/Select";
import { Flex } from "./components/@shared/FlexContainer/FlexContainer";
import GlobalStyle from "./Global.styles";

import { COLOR } from "./constants/color";
import { BASE_URL, changeBaseUrl } from "./apis/index";

export const theme = {
  PRIMARY: COLOR.CYAN_300,
  MAIN_TEXT_COLOR: COLOR.GRAY_900,
  SUB_TEXT_COLOR: COLOR.GRAY_500,
  BACKGROUND_COLOR: COLOR.GRAY_200,
  DANGER_TEXT_COLOR: COLOR.RED_500,
};

const targets = Object.keys(BASE_URL).map((name) => ({
  value: name,
  text: name,
}));

const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
  changeBaseUrl(event.target.value as keyof typeof BASE_URL);
};

changeBaseUrl(
  (localStorage.getItem("범인") as keyof typeof BASE_URL) || "수리"
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Flex
          style={{
            width: "100%",
            padding: "0.9375rem",
            justifyContent: "flex-end",
          }}
        >
          <Select
            options={targets}
            onChange={onChange}
            style={{ width: "9.375rem", backgroundColor: "skyblue" }}
          ></Select>
        </Flex>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

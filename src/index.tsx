import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import { COLOR } from "./constants/color";
import GlobalStyle from "./Global.styles";
import store from "./modules";
import Select from "./components/Select/Select";

import { BASE_URL, changeBaseUrl } from "./apis/index";
import { Flex } from "./components/@shared/FlexContainer/FlexContainer";

export const theme = {
  PRIMARY: COLOR.CYAN_300,
  MAIN_TEXT_COLOR: COLOR.GRAY_900,
  SUB_TEXT_COLOR: COLOR.GRAY_500,
  BACKGROUND_COLOR: COLOR.GRAY_200,
  DANGER_TEXT_COLOR: COLOR.RED_500,
};

const targets = Object.keys(BASE_URL).map((name) => ({ value: name, text: name }));

const API = localStorage.getItem("API") as keyof typeof BASE_URL;

const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
  changeBaseUrl(event.target.value as keyof typeof BASE_URL);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Flex style={{ width: "100%", padding: "0.9375rem", justifyContent: "flex-end" }}>
          <Select
            defaultValue={API}
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

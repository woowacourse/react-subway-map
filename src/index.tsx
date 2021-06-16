import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./modules";
import { BASE_URL, changeBaseUrl } from "./apis";

import App from "./App";
import { ModalProvider, Select } from "./components";
import { Flex } from "./components";

import GlobalStyle from "./Global.styles";

const targets = Object.keys(BASE_URL).map((name) => ({
  value: name,
  text: name,
}));

const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
  changeBaseUrl(event.target.value as keyof typeof BASE_URL);
};

changeBaseUrl(
  (localStorage.getItem("범인") as keyof typeof BASE_URL) || "에드"
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <GlobalStyle />
        <Flex
          css={{
            width: "100%",
            padding: "0.9375rem",
            justifyContent: "flex-end",
          }}
        >
          <Select
            options={targets}
            onChange={onChange}
            css={{ width: "9.375rem", backgroundColor: "skyblue" }}
          />
        </Flex>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

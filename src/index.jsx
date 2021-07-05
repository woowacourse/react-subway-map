import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

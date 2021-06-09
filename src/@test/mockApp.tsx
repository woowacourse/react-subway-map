import { Provider } from "react-redux";
import { MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { COLOR } from "../constants/color";
import App from "../App";
import GlobalStyle from "../Global.styles";
import store from "../modules";

export const theme = {
  PRIMARY: COLOR.CYAN_300,
  MAIN_TEXT_COLOR: COLOR.GRAY_900,
  SUB_TEXT_COLOR: COLOR.GRAY_500,
  BACKGROUND_COLOR: COLOR.GRAY_200,
  DANGER_TEXT_COLOR: COLOR.RED_500,
};

interface Props {
  history: MemoryHistory<unknown>;
}

export const MockedApp = ({ history }: Props) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

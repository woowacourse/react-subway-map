import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { theme } from "../src";
import GlobalStyle from "../src/Global.styles";
import { ThemeProvider } from "styled-components";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>);

addDecorator((style) => <ThemeProvider theme={theme}>{style()}</ThemeProvider>);

addDecorator((style) => (
  <>
    <GlobalStyle />
    {style()}
  </>
));

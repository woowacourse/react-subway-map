import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import GlobalStyle from "../src/Global.styles";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => (
  <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
));

addDecorator((style) => (
  <>
    <GlobalStyle />
    {style()}
  </>
));

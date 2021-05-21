import { addDecorator } from '@storybook/react';
import GlobalStyles from '../src/Global.styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(style => (
  <>
    <GlobalStyles />
    {style()}
  </>
));

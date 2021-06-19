import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from '../src/Global.styles';
import store from '../src/redux/store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    </Provider>
  ),
];

/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

export default server;

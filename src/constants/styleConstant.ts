import { BASE_URL } from './route';

export const COLOR = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  RED_400: '#FF5E57',
  MINT_300: '#a9f1df',
  MINT_500: '#2AC1BC',
  MINT_700: '#16aaa5',
  GRAY_100: '#F6F6F6',
  GRAY_200: '#dddddd',
  GRAY_300: '#CCCCCC',
  GRAY_400: '#AAAAAA',
  GRAY_700: '#888888',
  GRAY_800: '#555555',
  TEXT_COLOR: '#444444',
};

export const PALETTE = {
  RED: '#EA2027',
  ORANGE: '#f39c12',
  YELLOW: '#f1c40f',
  LIME: '#A3CB38',
  GREEN: '#2ecc71',
  TEAL: '#1abc9c',
  CYAN: '#3498db',
  BLUE: '#273c75',
  PURPLE: '#9c88ff',
  MAGENTA: '#ED4C67',
};

export const SIZE = {
  PAGE_MAX_WIDTH: '80rem',
  PAGE_MIN_WIDTH: '40rem',
};

export const Z_INDEX = {
  MODAL_WRAPPER: 200,
  NAVIGATION: 100,
};

export const SERVER_COLOR = {
  default: { PRIMARY: COLOR.MINT_500, SECONDARY: COLOR.MINT_700 },
  [BASE_URL.ROOT.name]: { PRIMARY: '#1DA1F2', SECONDARY: '#1087cc' },
  [BASE_URL.CHUNSIK.name]: { PRIMARY: '#feca57', SECONDARY: '#ff9f43' },
  [BASE_URL.SAKJEONG.name]: { PRIMARY: '#9c88ff', SECONDARY: '#8c7ae6' },
  [BASE_URL.SONNEOJAL.name]: { PRIMARY: '#fd79a8', SECONDARY: '#e84393' },
};

export const MAIN_COLOR = {
  PRIMARY: (name: string) => SERVER_COLOR[name].PRIMARY,
  SECONDARY: (name: string) => SERVER_COLOR[name].SECONDARY,
};

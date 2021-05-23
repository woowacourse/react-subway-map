export const ROUTE = {
  HOME: { PATH: '/' },
  SIGN_IN: { NAME: '로그인', PATH: '/sign-in' },
  SIGN_UP: { NAME: '회원가입', PATH: '/sign-up' },
  STATION_MANAGE: { NAME: '역 관리', PATH: '/station-mange' },
  LINE_MANAGE: { NAME: '노선 관리', PATH: '/line-manage' },
  SECTION_MANAGE: { NAME: '구간 관리', PATH: '/section-manage' },
};

export const COLOR = {
  RED: '#d70015',
  AMBER: '#fcca00',
  WHITE: '#ffffff',
  GRAY_100: '#eeeeee',
  GRAY_300: '#a8a4a4',
  GRAY_500: '#333333',
};

export const LINE_COLOR = {
  MAGENTA: '#DE59B9',
  PINK: '#E76E9A',
  RED: '#E24141',
  ORANGE: '#F37D3B',
  YELLOW: '#FBCD58',
  GREEN: '#73BC6D',
  CYAN: '#94DACD',
  BLUE: '#547ce4',
  NAVY: '#000080',
  PURPLE: '	#8A2BE2',
};

export const SIZE = {
  MD: 'medium',
  LG: 'large',
};

export const REG_EXP = {
  EMAIL:
    /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/,
  AGE: /^[0-9]*$/,
  PASSWORD:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$~!@#$%^&*()-+?])[A-Za-z\d$~!@#$%^&*()-+?]{6,20}$/,
};

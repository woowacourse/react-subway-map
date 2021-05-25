const ERROR_MESSAGE = {
  DEFAULT: '🚨 에러가 발생했습니다. 다시 시도해주세요.',
  LOGIN: '이메일, 비밀번호가 정확하지 않습니다.',
  INCOMPLETE_FORM: '👾 양식에 값이 정확하게 입력되었는지 확인해주세요.',
  INCOMPLETE_LOGIN_FORM: '이메일, 비밀번호를 입력하세요.',
  UNAUTHORIZED: '로그인한 사용자만 이용할 수 있는 서비스입니다.',
  INVALID_STATION_INPUT: '2자 이상 20자 이하 한글, 숫자만 입력해 주세요.',
  INVALID_LINE_INPUT: '2자 이상 10자 이하 한글, 숫자만 입력해 주세요.',
  INVALID_DISTANCE: '1과 300 사이의 숫자만 입력 가능합니다.',
  DUPLICATED_EMAIL: '이미 존재하는 이메일입니다.',
  DUPLICATED_STATION_NAME: '이미 존재하는 지하철 역입니다.',
  DUPLICATED_LINE_NAME: '이미 존재하는 지하철 노선입니다.',
  DUPLICATED_TERMINAL: '상행종점과 하행종점은 같을 수 없습니다.',
};

const SUCCESS_MESSAGE = {
  SIGNUP: '😄 회원가입에 성공했습니다.',
  LOGIN: '😄 로그인에 성공했습니다.',
  LOGOUT: '🙋‍♀️ 로그아웃 되었습니다.',
  ADD_STATION: '🚇 지하철 역이 추가되었습니다.',
  DELETE_STATION: '🚇 지하철 역이 제거되었습니다.',
  ADD_LINE: '🚇 지하철 노선이 추가되었습니다.',
  DELETE_LINE: '🚇 지하철 노선이 제거되었습니다.',
};

const CONFIRM_MESSAGE = {
  DELETE_STATION: (station: string) => `"${station}"을(를) 삭제하시겠습니까?`,
  DELETE_LINE: (line: string) => `"${line}"을(를) 삭제하시겠습니까?`,
};

export { ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE };

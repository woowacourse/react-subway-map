import { SIGNUP } from './appInfo';

export const ERROR_MESSAGE = {
  INVALID_EMAIL: '이메일 형식이 아닙니다.',
  DUPLICATED_EMAIL: '이미 존재하는 이메일입니다.',
  INVALID_RANGE_OF_AGE: `나이는 ${SIGNUP.MIN_AGE}이상, ${SIGNUP.MAX_AGE}이하의 값만 가능합니다`,
  INVALID_RANGE_OF_PASSWORD: `비밀번호의 길이는 ${SIGNUP.PASSWORD_MIN_LENGTH}자 이상, ${SIGNUP.PASSWORD_MAX_LENGTH}자 이하여야 합니다.`,
  INVALID_PASSWORD: `비밀번호는 공백 없이 영어와 숫자만으로 구성되어야 합니다.`,
  INVALID_SIGNUP_INPUT: '유효하지 않은 입력값이 존재합니다. 입력값을 확인해주세요.',
  PASSWORD_CONFIRM_FAILURE: '비밀번호와 동일하지 않습니다. 비밀번호를 확인해주세요.',
  SIGNUP: '회원가입에 실패했습니다ㅠㅜ 이미 존재하는 이메일인지 확인해주세요.',

  LOGIN_FAILURE: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',

  INVALID_STATION_NAME: '역 이름은 공백 없는 2자 이상의 한글이나 숫자로 이루어져야합니다.',
  DUPLICATED_STATION_NAME: '이미 존재하는 역이름 입니다.',

  INVALID_LINE_NAME: '노선 이름은 공백 없는 2자 이상의 한글이나 숫자로 이루어져야합니다.',
  DUPLICATED_SECTION: '상/하행선은 서로 같은 역으로 설정할 수 없습니다.',
  NONE_OF_SELECTED_SECTION: '상행선과 하행선을 모두 선택해주세요.',
  SHOULD_CONTAIN_ONE_STATION_IN_LINE: '구간 중 하나의 역만 노선에 등록되어있어야합니다.',
  DELETE_SECTION_FAILURE: '해당 구간을 삭제할 수 없습니다.',
  NOT_SELECTED_LINE: '노선을 선택해주세요.',

  INCOMPLETE_FORM: '입력이 완료되지 않았습니다. 모든 값을 입력해주세요!',
};

export const SUCCESS_MESSAGE = {
  SIGNUP: '회원가입 성공! 환영합니다☺️',
};

export const CONFIRM_MESSAGE = {
  DELETE_STATION: '해당 역을 삭제하시겠습니까?',
  DELETE_LINE: '해당 노선을 삭제하시겠습니까?',
  DELETE_SECTION: '해당 구간을 삭제하시겠습니까?',
};

const MESSAGE = {
  COMMON: {
    DELETE_CONFIRM: (name: string) => `${name}을 삭제하시겠습니까?`,
  },
  SIGNUP: {
    INVALID_PASSWORD: '비밀번호가 다릅니다.\n입력하신 비밀번호를 확인해주세요.',
    SUCCESS: '회원가입에 성공했습니다.',
    FAIL: '회원가입에 실패했습니다.',
  },
  LOGIN: {
    SUCCESS: '로그인에 성공했습니다.',
    FAIL: '로그인에 실패했습니다.',
  },
  STATION: {
    GET_LIST_FAIL: '역 목록 조회에 실패했습니다.',
    ADD_SUCCESS: '역을 추가했습니다.',
    ADD_FAIL: '역 추가에 실패했습니다.',
    DELETE_FAIL: '역 삭제에 실패했습니다.',
  },
  LINE: {
    GET_FAIL: '노선 조회에 실패했습니다.',
    GET_LIST_FAIL: '노선 목록 조회에 실패했습니다.',
    ADD_SUCCESS: '노선을 추가했습니다.',
    ADD_FAIL: '노선 추가에 실패했습니다.',
    DELETE_FAIL: '노선 삭제에 실패했습니다.',
  },
  SECTION: {
    ADD_SUCCESS: '구간을 추가했습니다.',
    ADD_FAIL: '구간 추가에 실패했습니다.',
    DELETE_FAIL: '구간 삭제에 실패했습니다.',
  },
  MAP: {
    GET_FAIL: '전체 목록 조회에 실패했습니다.',
  },
};

export default MESSAGE;

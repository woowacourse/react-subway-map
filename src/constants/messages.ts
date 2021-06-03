const ALERT_MESSAGE = {
  FAIL_TO_GET_STATIONS: '지하철역 정보를 가져오는 데 실패했습니다.',
  FAIL_TO_ADD_STATION: '지하철역 추가에 실패했습니다.',
  FAIL_TO_DELETE_STATION: '지하철역 삭제에 실패했습니다.',
  FAIL_TO_GET_LINES: '노선 정보를 가져오는 데 실패했습니다.',
  FAIL_TO_ADD_LINE: '노선 추가에 실패했습니다.',
  FAIL_TO_DELETE_LINE: '노선 삭제에 실패했습니다.',
  FAIL_TO_EDIT_LINE: '노선 수정에 실패했습니다.',
  FAIL_TO_ADD_SECTION: '구간 생성에 실패했습니다.',
  FAIL_TO_DELETE_SECTION: '구간 삭제에 실패했습니다.',

  SUCCESS_TO_SIGNUP: '회원가입에 성공했습니다.',
  SUCCESS_TO_LOGIN: '로그인되었습니다.',
  SUCCESS_TO_ADD_STAION: '지하철역을 추가했습니다.',
  SUCCESS_TO_EDIT_STATION: '지하철역 이름을 변경했습니다.',
  SUCCESS_TO_DELETE_STAION: '지하철역을 삭제했습니다.',
  SUCCESS_TO_ADD_LINE: '노선을 추가했습니다.',
  SUCCESS_TO_DELETE_LINE: '노선을 삭제했습니다.',
  SUCCESS_TO_EDIT_LINE: '노선 정보를 변경했습니다.',
  SUCCESS_TO_ADD_SECTION: '구간을 추가했습니다.',
  SUCCESS_TO_DELETE_SECTION: '구간을 삭제했습니다.',

  SERVER_ERROR: '서버에서 데이터를 불러오는 데 실패했습니다.',
  NO_PATH_AVAILABLE: '가능한 경로가 존재하지 않습니다.',
};

const CONFIRM_MESSAGE = {
  DELETE: '정말 삭제하시겠습니까?',
};

const NOTIFICATION = {
  STATION_NAME: '지하철역 이름은 한글, 숫자 조합만 가능합니다.',
  LINE_NAME: '노선 이름은 한글, 숫자 조합만 가능합니다.',
  DISMATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  DUPLICATED_EMAIL: '중복된 이메일입니다.',
  AVAILABLE_EMAIL: '사용 가능한 이메일입니다.',
  MATCH_PASSWORD: '비밀번호가 일치합니다.',
  SELECT_SERVER: '서버를 선택해 주세요',
};

export { ALERT_MESSAGE, CONFIRM_MESSAGE, NOTIFICATION };

const MESSAGE = {
  SUCCESS: {
    SIGNUP: '회원가입에 성공했습니다',
    LOGIN: '로그인에 성공했습니다',
    LOGOUT: '로그아웃에 성공했습니다',
    STATION_ADDED: '역이 생성되었습니다',
    STATION_DELETED: '역이 삭제되었습니다',
    STATION_EDITED: '역이 수정되었습니다',
    LINE_ADDED: '노선이 생성되었습니다',
    LINE_DELETED: '노선이 삭제되었습니다',
    LINE_EDITED: '노선이 수정되었습니다',
    SECTION_ADDED: '구간이 생성되었습니다',
    SECTION_DELETED: '구간이 삭제되었습니다',
  },
  ERROR: {
    INVALID_EMAIL: '유효한 이메일을 입력해주세요',
    INVALID_PASSWORD: '8자 이상의 비밀번호를 입력해주세요',
    DIFFERENT_PASSWORD: '비밀번호가 서로 다르게 입력되었습니다',
    DUPLICATED_EMAIL: '이미 등록되어 있는 이메일 주소입니다',
    LOGIN_FAILURE: '로그인에 실패했습니다',
    REQUEST_FAILURE: '서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요',
    INVALID_STATION_LENGTH: '노선 생성을 위해서는 최소 2개의 역이 필요합니다',
    REQUIRE_MINIMUM_STATION: '노선에는 최소 2개의 역이 필요하므로 삭제할 수 없습니다',
    INVALID_STATION_NAME_LENGTH: '2 ~ 20글자 사이의 역 이름을 입력해주세요',
    INVALID_LINE_NAME_LENGTH: '2 ~ 10글자 사이의 노선 이름을 입력해주세요',
    DELETE_STATION_NOT_EXISTS: '삭제하려는 지하철 역이 존재하지 않습니다',
    LINE_NOT_EXISTS: '노선이 존재하지 않습니다',
    REQUIRE_CONNECT_STATION: '노선에 있는 지하철 역에서부터 연결되도록 선택해주세요',
    STATIONS_ALREADY_CONTAINS: '선택한 두 지하철 역이 이미 노선에 포함되어 있습니다',
  },
};

export default MESSAGE;

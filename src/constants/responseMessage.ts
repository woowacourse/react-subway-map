import { ResultMessage } from '../hooks/useServerAPI';

const GET_ALL_DATA_RESPONSE = 'GET_ALL_DATA_RESPONSE';
const POST_DATA_RESPONSE = 'POST_DATA_RESPONSE';
const DELETE_RESPONSE = 'DELETE_RESPONSE';
const PUT_RESPONSE = 'PUT_RESPONSE';

export const SIGNUP: ResultMessage = {
  [POST_DATA_RESPONSE]: {
    fail: '회원 가입에 실패하셨습니다.',
    success: '회원가입에 성공하셨습니다.',
  },
};

export const STATION: ResultMessage = {
  [GET_ALL_DATA_RESPONSE]: {
    fail: '역 조회에 실패하였습니다.',
    success: '',
  },
  [POST_DATA_RESPONSE]: {
    fail: '지하철역이 추가에 실패하셨습니다.',
    success: '지하철역이 성공적으로 추가되었습니다.',
  },
  [DELETE_RESPONSE]: {
    fail: '지하철역 삭제에 실패하셨습니다.',
    success: '지하철역이 성공적으로 삭제되었습니다.',
  },
};

export const LINE: ResultMessage = {
  [GET_ALL_DATA_RESPONSE]: {
    fail: '노선 조회에 실패하였습니다.',
    success: '',
  },
  [POST_DATA_RESPONSE]: {
    fail: '노선 추가를 실패하셨습니다.',
    success: '노선 추가에 성공하셨습니다.',
  },
  [DELETE_RESPONSE]: {
    fail: '노선 제거에 실패하셨습니다.',
    success: '노선 제거에 성공하셨습니다.',
  },
  [PUT_RESPONSE]: {
    fail: '노선 수정에 실패하셨습니다.',
    success: '노선 수정에 성공하셨습니다.',
  },
};

export const SECTION: ResultMessage = {
  [POST_DATA_RESPONSE]: {
    fail: '구간 추가에 실패하셨습니다.',
    success: '구간 추가에 성공하셨습니다.',
  },
  [DELETE_RESPONSE]: {
    fail: '구간 삭제에 실패하셨습니다.',
    success: '구간 삭제에 성공하셨습니다.',
  },
};

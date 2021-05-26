import { call, put, takeLatest } from 'redux-saga/effects';
import { sectionAPI } from '../../api/section';
import { LineSection } from '../../interfaces';
import { error, getSectionAsync, pending, setSection } from './sectionReducer';

interface GetSectionAction {
  type: typeof getSectionAsync;
  payload: {
    id: LineSection['id'];
  };
}

interface GetLineResult {
  error: string;
  lineSection: LineSection;
}

function* getSectionSaga(action: GetSectionAction) {
  yield put(pending());
  const result: GetLineResult = yield call(sectionAPI.getSection, action.payload.id);
  console.log(result);
  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(setSection({ lineSection: result.lineSection }));
}

export function* sectionSaga() {
  yield takeLatest(getSectionAsync.type, getSectionSaga);
}

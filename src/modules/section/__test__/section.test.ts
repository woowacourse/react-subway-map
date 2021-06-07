import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { addSectionSaga, deleteSectionSaga, getSectionSaga } from '../sectionSaga';
import { sectionAPI } from '../../../api/section';
import sectionReducer, {
  addSectionAsync,
  deleteSectionAsync,
  error,
  getSectionAsync,
  pending,
  setSection,
} from '../sectionReducer';
import { mockDeleteSection, mockErrorMessage, mockNewSection, mockSection } from './section.data';

it('지하철 구간 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getSectionSaga, { type: getSectionAsync, payload: { id: mockSection.id } })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.getSection, mockSection.id), { lineSection: mockSection }]])
    .put(setSection({ lineSection: mockSection }))
    .hasFinalState({ lineSection: mockSection, error: '' })
    .run();
});

it('지하철 구간 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getSectionSaga, { type: getSectionAsync, payload: { id: mockSection.id } })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.getSection, mockSection.id), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lineSection: {}, error: mockErrorMessage })
    .run();
});

it('지하철 구간 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addSectionSaga, { type: addSectionAsync, payload: mockNewSection })
    .put(pending())
    .provide([[call(sectionAPI.addSection, mockNewSection), {}]])
    .put(getSectionAsync({ id: Number(mockNewSection.lineId) }))
    .run();
});

it('지하철 구간 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addSectionSaga, { type: addSectionAsync, payload: mockNewSection })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.addSection, mockNewSection), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lineSection: {}, error: mockErrorMessage })
    .run();
});

it('지하철 구간 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteSectionSaga, { type: deleteSectionAsync, payload: mockDeleteSection })
    .put(pending())
    .provide([[call(sectionAPI.deleteSection, mockDeleteSection), {}]])
    .put(getSectionAsync({ id: Number(mockNewSection.lineId) }))
    .run();
});

it('지하철 구간 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteSectionSaga, { type: deleteSectionAsync, payload: mockDeleteSection })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.deleteSection, mockDeleteSection), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lineSection: {}, error: mockErrorMessage })
    .run();
});

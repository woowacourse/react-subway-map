import { call } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { addSectionSaga, deleteSectionSaga, getSectionSaga } from './sectionSaga';
import sectionReducer, {
  addSectionAsync,
  deleteSectionAsync,
  error,
  getLineSectionAsync,
  pending,
  setLineSection,
} from './sectionReducer';
import { sectionAPI } from '../../api/section';
import { AddSectionRequest, DeleteSectionRequest, LineSection } from '../../interfaces';

const lineSection: LineSection = {
  id: 1,
  color: '#123456',
  name: '포코선',
  stations: [
    { id: 1, name: '우테코역', transferLines: [{ id: 2, name: '2호선', color: '#aaaaaa' }] },
    { id: 2, name: '준역', transferLines: [{ id: 2, name: '2호선', color: '#aaaaaa' }] },
  ],
  sections: [
    {
      upStation: {
        id: 1,
        name: '우테코역',
      },
      downStation: {
        id: 2,
        name: '준역',
      },
      distance: 100,
    },
  ],
};

const newSection: AddSectionRequest = { lineId: '1', upStationId: '2', downStationId: '3', distance: '100' };
const deletedSection: DeleteSectionRequest = { lineId: '1', stationId: '3' };

const errorMessage = '에러 메세지';

it('지하철 구간 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getSectionSaga, { type: getLineSectionAsync.type, payload: lineSection.id })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.getSection, lineSection.id), { data: lineSection }]])
    .put(setLineSection(lineSection))
    .hasFinalState({ lineSection: lineSection, error: '' })
    .run();
});

it('지하철 구간 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getSectionSaga, { type: getLineSectionAsync.type, payload: lineSection.id })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.getSection, lineSection.id), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ lineSection: {}, error: errorMessage })
    .run();
});

it('지하철 구간 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addSectionSaga, { type: addSectionAsync.type, payload: newSection })
    .put(pending())
    .provide([[call(sectionAPI.addSection, newSection), {}]])
    .put(getLineSectionAsync(Number(newSection.lineId)))
    .run();
});

it('지하철 구간 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addSectionSaga, { type: addSectionAsync.type, payload: newSection })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.addSection, newSection), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ lineSection: {}, error: errorMessage })
    .run();
});

it('지하철 구간 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteSectionSaga, { type: deleteSectionAsync.type, payload: deletedSection })
    .put(pending())
    .provide([[call(sectionAPI.deleteSection, deletedSection), {}]])
    .put(getLineSectionAsync(Number(newSection.lineId)))
    .run();
});

it('지하철 구간 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteSectionSaga, { type: deleteSectionAsync.type, payload: deletedSection })
    .withReducer(sectionReducer)
    .put(pending())
    .provide([[call(sectionAPI.deleteSection, deletedSection), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ lineSection: {}, error: errorMessage })
    .run();
});

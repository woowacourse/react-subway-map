import { call, select } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { getLinesSaga, addLineSaga, deleteLineSaga, selectLines } from '../lineSaga';
import lineReducer, { addLineAsync, deleteLineAsync, error, pending, setLines } from '../lineReducer';
import { lineAPI } from '../../../api/line';
import { mockAddedLineList, mockErrorMessage, mockLineList, mockNewLine, mockNewLineInput } from './line.data';

it('지하철 노선 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getLinesSaga)
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.getLines), { lines: mockLineList }]])
    .put(setLines({ lines: mockLineList }))
    .hasFinalState({ lines: mockLineList, error: '' })
    .run();
});

it('지하철 노선 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getLinesSaga)
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.getLines), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lines: [], error: mockErrorMessage })
    .run();
});

it('지하철 노선 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addLineSaga, { type: addLineAsync, payload: { line: mockNewLineInput } })
    .withReducer(lineReducer)
    .withState({ lines: mockLineList, error: '' })
    .put(pending())
    .provide([
      [call(lineAPI.addLine, mockNewLineInput), { line: mockNewLine }],
      [select(selectLines), mockLineList],
    ])
    .put(setLines({ lines: [mockNewLine, ...mockLineList] }))
    .hasFinalState({ lines: mockAddedLineList, error: '' })
    .run();
});

it('지하철 노선 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addLineSaga, { type: addLineAsync, payload: { line: mockNewLineInput } })
    .withReducer(lineReducer)
    .withState({ lines: mockLineList, error: '' })
    .put(pending())
    .provide([[call(lineAPI.addLine, mockNewLineInput), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lines: mockLineList, error: mockErrorMessage })
    .run();
});

it('지하철 노선 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteLineSaga, { type: deleteLineAsync, payload: { id: mockNewLine['id'] } })
    .withReducer(lineReducer)
    .withState({ lines: mockAddedLineList, error: '' })
    .put(pending())
    .provide([
      [call(lineAPI.deleteLine, mockNewLine['id']), {}],
      [select(selectLines), mockAddedLineList],
    ])
    .put(setLines({ lines: mockAddedLineList.filter(line => line.id !== mockNewLine['id']) }))
    .hasFinalState({ lines: mockLineList, error: '' })
    .run();
});

it('지하철 노선 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteLineSaga, { type: deleteLineAsync, payload: { id: mockNewLine['id'] } })
    .withReducer(lineReducer)
    .withState({ lines: mockAddedLineList, error: '' })
    .put(pending())
    .provide([[call(lineAPI.deleteLine, mockNewLine['id']), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ lines: mockAddedLineList, error: mockErrorMessage })
    .run();
});

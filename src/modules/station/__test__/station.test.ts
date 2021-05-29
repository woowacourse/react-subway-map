import { call, select } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { mockAddedStations, mockErrorMessage, mockNewStation, mockStations } from './station.data';

import { stationAPI } from '../../../api/station';
import { getStationsSaga, addStationSaga, selectStations, deleteStationSaga } from '../stationSaga';
import stationReducer, { addStationAsync, deleteStationAsync, error, pending, setStations } from '../stationReducer';

it('지하철 역 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { stations: mockStations }]])
    .put(setStations({ stations: mockStations }))
    .hasFinalState({ stations: mockStations, error: '' })
    .run();
});

it('지하철 역 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ stations: [], error: mockErrorMessage })
    .run();
});

it('지하철 역 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addStationSaga, { type: addStationAsync, payload: { name: mockNewStation.name } })
    .withReducer(stationReducer)
    .withState({
      stations: mockStations,
      error: '',
    })
    .put(pending())
    .provide([
      [call(stationAPI.addStation, mockNewStation.name), { station: mockNewStation }],
      [select(selectStations), mockStations],
    ])
    .put(setStations({ stations: [Object.assign(mockNewStation, { lines: [] }), ...mockStations] }))
    .hasFinalState({ stations: mockAddedStations, error: '' })
    .run();
});

it('지하철 역 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addStationSaga, { type: addStationAsync, payload: { name: mockNewStation.name } })
    .withReducer(stationReducer)
    .withState({
      stations: mockStations,
      error: '',
    })
    .put(pending())
    .provide([[call(stationAPI.addStation, mockNewStation.name), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ stations: mockStations, error: mockErrorMessage })
    .run();
});

it('지하철 역 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteStationSaga, { type: deleteStationAsync, payload: { id: mockNewStation.id } })
    .withReducer(stationReducer)
    .withState({
      stations: mockAddedStations,
      error: '',
    })
    .put(pending())
    .provide([
      [call(stationAPI.deleteStation, mockNewStation.id), {}],
      [select(selectStations), mockStations],
    ])
    .put(setStations({ stations: mockStations.filter(station => station.id !== mockNewStation.id) }))
    .hasFinalState({ stations: mockStations, error: '' })
    .run();
});

it('지하철 역 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteStationSaga, { type: deleteStationAsync, payload: { id: mockNewStation.id } })
    .withReducer(stationReducer)
    .withState({
      stations: mockAddedStations,
      error: '',
    })
    .put(pending())
    .provide([[call(stationAPI.deleteStation, mockNewStation.id), { error: mockErrorMessage }]])
    .put(error({ error: mockErrorMessage }))
    .hasFinalState({ stations: mockAddedStations, error: mockErrorMessage })
    .run();
});

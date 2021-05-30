import {
  addStationThunk,
  deleteStationThunk,
  addLineThunk,
  deleteLineThunk,
  addSectionThunk,
  deleteSectionThunk,
} from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MOCK_SERVER, TEST } from '../../constants';
import store from '..';

const mock = new MockAdapter(axios);

const mockStation = {
  id: TEST.MOCK_DATA.ID,
  name: TEST.MOCK_DATA.NAME,
};

const mockLine = {
  color: '',
  id: TEST.MOCK_DATA.ID,
  name: TEST.MOCK_DATA.NAME,
  stations: [],
};

it('역을 추가 할 수 있다.', async () => {
  const params = { name: TEST.MOCK_DATA.NAME };

  mock.onPost(`${MOCK_SERVER}/stations`).reply(200, mockStation);
  await store.dispatch(addStationThunk({ params }));

  const { subway } = store.getState();

  expect(subway.stations).toContainEqual(mockStation);
});

it('역을 삭제 할 수 있다.', async () => {
  const id = TEST.MOCK_DATA.ID;

  mock.onDelete(`${MOCK_SERVER}/stations/${id}`).reply(200);
  await store.dispatch(deleteStationThunk({ id }));

  const { subway } = store.getState();

  expect(subway.stations).not.toContainEqual(mockStation);
});

it('노선을 추가 할 수 있다.', async () => {
  const params = {
    name: TEST.MOCK_DATA.NAME,
    color: '',
    upStationId: 2,
    downStationId: 1,
    distance: 10,
  };

  mock.onPost(`${MOCK_SERVER}/lines`).reply(200, mockLine);
  await store.dispatch(addLineThunk({ params }));

  const { subway } = store.getState();

  expect(subway.lines).toContainEqual(mockLine);
});

it('구간을 추가할 수 있다.', async () => {
  const id = 1;
  const params = {
    upStationId: 2,
    downStationId: 1,
    distance: 10,
  };

  mock.onPost(`${MOCK_SERVER}/lines/${id}/sections`).reply(200);
  mock.onGet(`${MOCK_SERVER}/lines/${id}`).reply(200, mockLine);
  await store.dispatch(addSectionThunk({ id, params }));

  const { subway } = store.getState();

  expect(subway.lines).toContainEqual(mockLine);
});

it('구간을 삭제할 수 있다.', async () => {
  const lineId = 1;
  const stationId = 1;

  mock
    .onDelete(`${MOCK_SERVER}/lines/${lineId}/sections?stationId=${stationId}`)
    .reply(200);
  mock.onGet(`${MOCK_SERVER}/lines/${lineId}`).reply(200, mockLine);
  await store.dispatch(deleteSectionThunk({ lineId, stationId }));

  const { subway } = store.getState();

  expect(subway.lines).toContainEqual(mockLine);
});

it('노선을 삭제 할 수 있다.', async () => {
  const id = TEST.MOCK_DATA.ID;

  mock.onDelete(`${MOCK_SERVER}/lines/${id}`).reply(200);
  await store.dispatch(deleteLineThunk({ id }));

  const { subway } = store.getState();

  expect(subway.lines).not.toContainEqual(mockLine);
});

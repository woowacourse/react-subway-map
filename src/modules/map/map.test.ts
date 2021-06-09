import { mapAPI } from './../../api/map';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import mapReducer, { pending, setMap, error } from './mapReducer';
import { getMapSaga } from './mapSaga';
import { VALIDATION } from '../../constants/validation';

const mapData = [
  {
    id: 19,
    name: '인치선',
    color: '#2ecc71',
    stations: [
      {
        id: 4,
        name: '역삼역',
        distance: 22,
        transferLines: [
          {
            id: 9,
            name: '곤이선',
            color: '#3498db',
          },
        ],
      },
      {
        id: 5,
        name: '잠실역',
        distance: VALIDATION.LAST_STATION_DISTANCE,
        transferLines: [],
      },
    ],
  },
];

const errorMessage = '에러 메세지';

it('지하철 전체 보기 정보를 성공적으로 불러온다.', async () => {
  return expectSaga(getMapSaga)
    .withReducer(mapReducer)
    .put(pending())
    .provide([[call(mapAPI.getMap), { data: mapData }]])
    .put(setMap(mapData))
    .hasFinalState({ mapData, error: '' })
    .run();
});

it('지하철 전체 보기 정보를 불러오는데 실패한다.', async () => {
  return expectSaga(getMapSaga)
    .withReducer(mapReducer)
    .put(pending())
    .provide([[call(mapAPI.getMap), { error: errorMessage }]])
    .put(error(errorMessage))
    .hasFinalState({ mapData: [], error: errorMessage })
    .run();
});

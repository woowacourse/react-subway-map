import { call, select } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { stationAPI } from '../../api/station';
import { error, pending, setStations } from './stationReducer';
import { getStationsSaga, addStationSaga } from './stationSaga';
import stationReducer from './stationReducer';

const mockStationState = {
  stations: [
    {
      id: 1,
      name: '인치역',
      lines: [
        { id: 21, name: '2호선', color: '#FFFFFF' },
        { id: 22, name: '3호선', color: '#AAAAAA' },
      ],
    },
    {
      id: 2,
      name: '곤이역',
      lines: [
        { id: 55, name: '4호선', color: '#FDDEAF' },
        { id: 53, name: '5호선', color: '#492382' },
      ],
    },
  ],
  error: '',
};

const stationList = [
  {
    id: 1,
    name: '인치역',
    lines: [
      { id: 21, name: '2호선', color: '#FFFFFF' },
      { id: 22, name: '3호선', color: '#AAAAAA' },
    ],
  },
  {
    id: 2,
    name: '곤이역',
    lines: [
      { id: 55, name: '4호선', color: '#FDDEAF' },
      { id: 53, name: '5호선', color: '#492382' },
    ],
  },
];
it('자하철 역 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { stations: stationList }]])
    .put(setStations({ stations: stationList }))
    .hasFinalState({ stations: stationList, error: '' })
    .run();
});

it('자하철 역 목록을 불러오는데 실패한다.', async () => {
  const errorMessage = '에러 메세지';
  return expectSaga(getStationsSaga)
    .withReducer(stationReducer)
    .put(pending())
    .provide([[call(stationAPI.getStations), { error: errorMessage }]])
    .put(error({ error: errorMessage }))
    .hasFinalState({ stations: [], error: errorMessage })
    .run();
});

// it('자하철 역 목록을 성공적으로 추가한다.', async () => {
//   const newStation = {
//     id: 3,
//     name: '포코역',
//   };
//   return (
//     expectSaga(addStationSaga({ type: '', payload: { name: '' } }))
//       .withReducer(stationReducer)
//       //   .withState(mockStationState)
//       .put(pending())
//       .provide([
//         [call(stationAPI.addStation, newStation.name), { station: newStation }],
//         [select(state => state.station.stations), stationList],
//       ])
//       .put(setStations({ stations: [Object.assign(newStation, { lines: [] }), ...stationList] }))
//       .hasFinalState({ stations: [Object.assign(newStation, { lines: [] }), ...stationList], error: '' })
//       .run()
//   );
// });

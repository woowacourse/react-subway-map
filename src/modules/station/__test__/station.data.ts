import { AddStationResult, StationState } from '../../../interfaces/station';

export const mockErrorMessage: StationState['error'] = '에러 메세지';

export const mockNewStation: AddStationResult['station'] = {
  id: 3,
  name: '포코역',
};

export const mockStations: StationState['stations'] = [
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

export const mockAddedStations: StationState['stations'] = [
  {
    id: 3,
    name: '포코역',
    lines: [],
  },
  {
    id: 2,
    name: '곤이역',
    lines: [
      { id: 55, name: '4호선', color: '#FDDEAF' },
      { id: 53, name: '5호선', color: '#492382' },
    ],
  },
  {
    id: 1,
    name: '인치역',
    lines: [
      { id: 21, name: '2호선', color: '#FFFFFF' },
      { id: 22, name: '3호선', color: '#AAAAAA' },
    ],
  },
];

import { AddLineAction, LineState } from '../../../interfaces/line';

export const mockErrorMessage: LineState['error'] = '에러 메세지';

export const mockNewLineInput: AddLineAction['payload']['line'] = {
  name: '포코선',
  color: '#123456',
  upStationId: '1',
  downStationId: '2',
  distance: '100',
};

export const mockNewLine = {
  id: 3,
  name: '포코선',
  color: '#123456',
};

export const mockLineList: LineState['lines'] = [
  {
    id: 1,
    name: '인치선',
    color: '#FDDEAF',
  },
  {
    id: 2,
    name: '곤이선',
    color: '#492382',
  },
];

export const mockAddedLineList: LineState['lines'] = [
  {
    id: 3,
    name: '포코선',
    color: '#123456',
  },
  {
    id: 2,
    name: '곤이선',
    color: '#492382',
  },
  {
    id: 1,
    name: '인치선',
    color: '#FDDEAF',
  },
];

import { AddSectionAction, DeleteSectionAction, SectionState } from '../../../interfaces/section';

export const mockErrorMessage: SectionState['error'] = '에러 메세지';

export const mockNewSection: AddSectionAction['payload'] = {
  lineId: '1',
  upStationId: '2',
  downStationId: '3',
  distance: '100',
};
export const mockDeleteSection: DeleteSectionAction['payload'] = { lineId: '1', stationId: '3' };

export const mockSection: SectionState['lineSection'] = {
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

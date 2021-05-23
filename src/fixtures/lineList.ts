import { LineColor } from '../components/molecules/ColorSelector/ColorSelector';
import { ILineRes } from '../type';

const lineList: ILineRes[] = [
  {
    id: 1,
    name: '신분당선',
    color: LineColor.COLOR_1,
    extraFare: 100,
    stations: [
      {
        id: 1,
        name: '강남역',
      },
      {
        id: 2,
        name: '판교역',
      },
      {
        id: 3,
        name: '정자역',
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: '강남역',
        },
        downStation: {
          id: 2,
          name: '판교역',
        },
        distance: 10,
      },
    ],
  },
];

export default lineList;

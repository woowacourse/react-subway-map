import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Station } from '..';
import stationList from '../../../fixtures/stationList';
import useServerAPI from '../../../hooks/useServerAPI';
import { IStationRes } from '../../../type.d';

jest.mock('react-redux');
jest.mock('../../../hooks/useServerAPI');

describe('Station', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
  });

  it('지하철 역 이름을 입력한 후 추가 버튼을 클릭하면, 지하철 역이 추가된다.', () => {
    const newStationList = [...stationList];
    const newStation: IStationRes = {
      id: 100,
      name: '도비역',
    };

    (useSelector as jest.Mock).mockImplementation(() => {
      return { id: 1 };
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useServerAPI as jest.Mock).mockImplementation(() => {
      return {
        allData: newStationList,
        getAllData: () => newStationList,
        postData: () => {
          newStationList.push(newStation);
        },
      };
    });

    const station = render(
      <BrowserRouter>
        <Station />
      </BrowserRouter>,
    );

    const nameInput = station.getByRole('textbox');
    fireEvent.change(nameInput, { target: { value: newStation.name } });
    const addButton = station.getByRole('button', {
      name: /추가/i,
    });

    fireEvent.click(addButton);
    expect(station.container).toHaveTextContent(newStation.name);
  });

  it('지하철역 목록 중 특정 지하철 역의 삭제 버튼을 누르면, 해당 지하철 역이 삭제 된다.', () => {
    const newStationList: IStationRes[] = [...stationList];

    (useSelector as jest.Mock).mockImplementation(() => {
      return { id: 1 };
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useServerAPI as jest.Mock).mockImplementation(() => {
      return {
        allData: newStationList,
        getAllData: () => newStationList,
        deleteData: () => {
          newStationList.splice(0, 1);
        },
      };
    });

    const station = render(
      <BrowserRouter>
        <Station />
      </BrowserRouter>,
    );

    const prevLen = station.queryAllByText('삭제').length;
    const button = station.queryAllByText('삭제')[0];

    fireEvent.click(button);

    expect(newStationList.length).toEqual(prevLen - 1);
  });
});

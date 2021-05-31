import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Station } from '..';
import stationList from '../../../fixtures/stationList';
import {
  validAccessTokenState,
  validHostState,
  validSignedUser,
} from '../../../fixtures/useSelectorState';
import { IStationRes } from '../../../type.d';
import usePostRequest from '../../../hooks/usePostRequest';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import useGetAllRequest from '../../../hooks/useGetAllRequest';

jest.mock('../../../hooks/usePostRequest');
jest.mock('../../../hooks/useDeleteRequest');
jest.mock('../../../hooks/useGetAllRequest');
jest.mock('react-redux');

let newStationList: IStationRes[];
let newStation: IStationRes;

describe('Station', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
  });

  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    (useSelector as jest.Mock).mockImplementation(() => {
      return {
        signedUser: validSignedUser,
        accessTokenState: validAccessTokenState,
        hostState: validHostState,
      };
    });

    newStationList = [...stationList];
    newStation = {
      id: 100,
      name: '도비역',
    };
    (useGetAllRequest as jest.Mock).mockImplementation(() => {
      return {
        allData: newStationList,
        getAllData: () => newStationList,
      };
    });
    (usePostRequest as jest.Mock).mockImplementation(() => {
      return {
        postData: () => {
          newStationList.push(newStation);
        },
      };
    });
    (useDeleteRequest as jest.Mock).mockImplementation(() => {
      return {
        deleteData: () => {
          newStationList.splice(0, 1);
        },
      };
    });
  });

  it('지하철 역 이름을 입력한 후 추가 버튼을 클릭하면, 지하철 역이 추가된다.', () => {
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

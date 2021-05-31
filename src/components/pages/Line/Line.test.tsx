import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import lineList from '../../../fixtures/lineList';
import {
  validAccessTokenState,
  validHostState,
  validSignedUser,
} from '../../../fixtures/useSelectorState';

import { ILineRes } from '../../../type.d';
import Line from './Line';
import usePostRequest from '../../../hooks/usePostRequest';
import useDeleteRequest from '../../../hooks/useDeleteRequest';
import useGetAllRequest from '../../../hooks/useGetAllRequest';
import usePutRequest from '../../../hooks/usePutRequest';

jest.mock('../../../hooks/usePostRequest');
jest.mock('../../../hooks/useDeleteRequest');
jest.mock('../../../hooks/useGetAllRequest');
jest.mock('../../../hooks/usePutRequest');
jest.mock('react-redux');
let newLineList: ILineRes[] = [];

describe('Line', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
  });

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return {
        signedUser: validSignedUser,
        accessTokenState: validAccessTokenState,
        hostState: validHostState,
      };
    });

    newLineList = [...lineList];
    const newLine: ILineRes = {
      id: 3,
      name: '테스트노선',
      color: '#ccc',
      extraFare: 0,
      stations: [],
      sections: [],
    };

    (useGetAllRequest as jest.Mock).mockImplementation(() => {
      return {
        allData: newLineList,
        getAllData: () => newLineList,
        getAllDataResponse: null,
      };
    });
    (usePostRequest as jest.Mock).mockImplementation(() => {
      return {
        postDataResponse: null,
      };
    });
    (usePutRequest as jest.Mock).mockImplementation(() => {
      return {
        putData: () => (newLineList[0].name = '수정된역'),
        putDataResponse: null,
      };
    });
    (useDeleteRequest as jest.Mock).mockImplementation(() => {
      return {
        deleteData: () => {
          newLineList.splice(0, 1);
        },

        deleteDataResponse: null,
      };
    });
  });

  it('노선 추가 버튼을 클릭하면, 노선 추가 모달이 띄워진다.', () => {
    const line = render(
      <BrowserRouter>
        <Line />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    const addButton = line.getByRole('button', {
      name: /노선 추가/i,
    });

    fireEvent.click(addButton);

    expect(line.container.querySelector('#modal > div > div')).toBeVisible();
  });

  it('노선 추가 모달에서, 노선을 추가하면 노선 리스트에 노선이 추가된다.', () => {
    const line = render(
      <BrowserRouter>
        <Line />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    const openModalButton = line.getByRole('button', {
      name: /노선 추가/i,
    });
    fireEvent.click(openModalButton);

    const addModal = line.container.querySelector('#modal > div > div');

    if (!addModal) throw new Error('모달을 찾을 수 없습니다.');

    const lineNameInput = addModal.querySelector('input[type=text]');
    const distanceInput = addModal.querySelector('input[type=number]');

    const [upStationSelect, downStationSelect] = Array.from(addModal.querySelectorAll('select'));
    const [colorButton] = Array.from(addModal.querySelectorAll('button[type=button]'));
    const addLineButton = addModal.querySelector('button[type=submit]');

    if (!lineNameInput) throw new Error('노선이름 입력란을 찾을 수 없습니다.');
    if (!distanceInput) throw new Error('거리 입력란을 찾을 수 없습니다.');
    if (!upStationSelect) throw new Error('상행선 선택란을 찾을 수 없습니다.');
    if (!downStationSelect) throw new Error('하행선 선택란을 찾을 수 없습니다.');
    if (!colorButton) throw new Error('노선 색깔 버튼을 찾을 수 없습니다.');
    if (!addLineButton) throw new Error('노선 추가 버튼을 찾을 수 없습니다.');

    fireEvent.change(lineNameInput, { target: { value: '테스트노선' } });
    fireEvent.change(distanceInput, { target: { value: '10' } });
    fireEvent.change(upStationSelect, { target: { value: 2 } });
    fireEvent.change(downStationSelect, { target: { value: 1 } });
    fireEvent.click(colorButton);

    fireEvent.click(addLineButton);
    expect(line.container).toHaveTextContent('테스트노선');
  });

  it('노선 추가 모달에서, 노선을 수정하면 노선 리스트에 노선이 반영된다.', () => {
    const line = render(
      <BrowserRouter>
        <Line />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    const modifyButton = line.getAllByRole('button', {
      name: /수정/i,
    })[0];

    fireEvent.click(modifyButton);

    const modifyModal = line.container.querySelector('#modal > div > div');

    if (!modifyModal) throw new Error('모달을 찾을 수 없습니다.');

    const lineNameInput = modifyModal.querySelector('input[type=text]');
    const [colorButton] = Array.from(modifyModal.querySelectorAll('button[type=button]'));
    const modifyLineButton = modifyModal.querySelector('button[type=submit]');

    if (!lineNameInput) throw new Error('노선이름 입력란을 찾을 수 없습니다.');
    if (!colorButton) throw new Error('노선 색깔 버튼을 찾을 수 없습니다.');
    if (!modifyLineButton) throw new Error('노선 추가 버튼을 찾을 수 없습니다.');

    fireEvent.change(lineNameInput, { target: { value: '수정된역' } });
    fireEvent.click(colorButton);

    fireEvent.click(modifyLineButton);
    expect(line.container).toHaveTextContent('수정된역');
  });

  it.only('노선 목록에서 특정 노선의 삭제 버튼을 클릭하면 해당 노선이 노선 리스트에서 삭제된다.', () => {
    jest.spyOn(window, 'confirm').mockImplementation(jest.fn(() => true));
    const line = render(
      <BrowserRouter>
        <Line />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    const deleteButton = line.getAllByRole('button', {
      name: /삭제/i,
    })[0];

    const prevLineItemLength = line.getAllByRole('listitem').length;
    fireEvent.click(deleteButton);

    expect(newLineList.length).toEqual(prevLineItemLength - 1);
  });
});

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import lineList from '../../../fixtures/lineList';
import stationList from '../../../fixtures/stationList';
import {
  validAccessTokenState,
  validHostState,
  validSignedUser,
} from '../../../fixtures/useSelectorState';
import useServerAPI from '../../../hooks/useServerAPI';
import { ILineRes, IStationRes } from '../../../type.d';
import Section from './Section';

jest.mock('react-redux');
jest.mock('../../../hooks/useServerAPI');

let newLineList: ILineRes[] = [];

describe('Section', () => {
  beforeAll(() => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    jest.spyOn(window, 'alert').mockImplementation(() => true);
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

    newLineList = [...lineList];

    const newStation: IStationRes = {
      id: 4,
      name: '역삼역',
    };

    (useServerAPI as jest.Mock).mockImplementation((baseUrl: string) => {
      const stationServerAPi = {
        allData: [...stationList],
        getAllData: () => [...stationList],
        getAllDataResponse: null,
      };

      const lineServerAPI = {
        allData: newLineList,
        getAllData: () => newLineList,
        getAllDataResponse: null,

        postData: () => {
          newLineList[1].stations.push(newStation);
        },
        postDataResponse: null,

        deleteData: () => {
          newLineList[2].stations.splice(0, 1);
        },
        deleteDataResponse: null,
      };

      return baseUrl.includes('stations') ? stationServerAPi : lineServerAPI;
    });
  });

  it('구간 추가 버튼을 클릭하면, 구간 추가 모달이 띄워진다.', () => {
    const section = render(
      <BrowserRouter>
        <Section />
        <div id="modal"></div>
      </BrowserRouter>,
    );
    const addButton = section.getByRole('button', {
      name: /구간 추가/i,
    });
    fireEvent.click(addButton);
    expect(section.container.querySelector('#modal > div > div')).toBeVisible();
  });

  it('구간 추가 모달에서, 구간을 추가하면 구간 리스트에 구간이 추가된다.', () => {
    const section = render(
      <BrowserRouter>
        <Section />
        <div id="modal"></div>
      </BrowserRouter>,
    );
    const openModalButton = section.getByRole('button', {
      name: /구간 추가/i,
    });
    fireEvent.click(openModalButton);
    const addModal = section.container.querySelector('#modal > div > div');
    if (!addModal) throw new Error('모달을 찾을 수 없습니다.');

    const [lineSelect, upStationSelect, downStationSelect] = Array.from(
      addModal.querySelectorAll('select'),
    );
    const sectionDistanceInput = addModal.querySelector('input[type=text]');
    const addSectionButton = addModal.querySelector('button[type=submit]');
    if (!lineSelect) throw new Error('노선 선택창을 찾을 수 없습니다.');
    if (!upStationSelect) throw new Error('상행선 선택란을 찾을 수 없습니다.');
    if (!downStationSelect) throw new Error('하행선 선택란을 찾을 수 없습니다.');
    if (!sectionDistanceInput) throw new Error('거리 입력란을 찾을 수 없습니다.');
    if (!addSectionButton) throw new Error('노선 추가 모달에서 확인 버튼을 찾을 수 없습니다.');

    fireEvent.change(lineSelect, { target: { value: 2 } }); // 콜린노선
    fireEvent.change(upStationSelect, { target: { value: 1 } }); // 강남역
    fireEvent.change(downStationSelect, { target: { value: 4 } }); // 역삼역
    fireEvent.change(sectionDistanceInput, { target: { value: '3' } });
    fireEvent.click(addSectionButton);

    expect(section.container).toHaveTextContent('역삼역');
  });

  it('구간관리 페이지에서 특정 노선을 선택한 후, 특정 구간의 삭제버튼을 누르면 해당 구간이 삭제된다.', async () => {
    const section = render(
      <BrowserRouter>
        <Section />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    const lineSelect = section.getByRole('combobox');
    if (!lineSelect) throw new Error('노선 선택창을 찾을 수 없습니다.');

    fireEvent.change(lineSelect, { target: { value: 3 } }); // 신분당선

    const deleteButton = section.getAllByRole('button', {
      name: /삭제/i,
    })[0];

    fireEvent.click(deleteButton); // 신분당선
    section.rerender(
      <BrowserRouter>
        <Section />
        <div id="modal"></div>
      </BrowserRouter>,
    );

    expect(section.container).not.toHaveTextContent('강남역');
  });
});

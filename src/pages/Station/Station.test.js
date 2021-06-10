import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrapComponent from './TestComponent';
import store from '../../redux/store';

import { StationPage } from '.';
import { SERVER_LIST } from '../../constants';

const mockServer = SERVER_LIST['Sally'];
const Component = WrapComponent(StationPage, store, { server: mockServer });

describe('역 관리 페이지 테스트', () => {
  test('역 관리 페이지에 진입한 경우, 지하철 역 이름 입력창에 autoFocus가 되어야 한다.', () => {
    const { container } = render(Component);
    const stationInput = container.querySelector('input');

    expect(stationInput).toHaveFocus();
  });
});

describe('역 이름 유효성 테스트', () => {
  test('2글자 한글인 경우, 유효한 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '하루');
    expect(message).toBeEmptyDOMElement();
  });

  test('20글자 한글인 경우, 유효한 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '공원사랑해공원사랑해공원사랑해공원사랑해');
    expect(message).toBeEmptyDOMElement();
  });

  test('1글자 한글인 경우, 유효하지 않은 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '티');
    expect(message).not.toBeEmptyDOMElement();
  });

  test('21글자 한글인 경우, 유효하지 않은 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '공원사랑해공원사랑해공원사랑해공원사랑해요');
    expect(message).not.toBeEmptyDOMElement();
  });

  test('영어가 포함된 경우, 유효하지 않은 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, 'haru');
    expect(message).not.toBeEmptyDOMElement();
  });

  test('특수문자가 포함된 경우, 유효하지 않은 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '!@#$티케');
    expect(message).not.toBeEmptyDOMElement();
  });

  test('공백이 포함된 경우, 유효하지 않은 이름으로 판단해야 한다.', () => {
    const { container, getByTestId } = render(Component);
    const stationInput = container.querySelector('input');
    const message = getByTestId('message');

    userEvent.type(stationInput, '공 원 사 랑 해 요');
    expect(message).not.toBeEmptyDOMElement();
  });
});

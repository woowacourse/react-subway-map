/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  getByRole,
  getByPlaceholderText,
  getByLabelText,
} from '../../test-utils';
import LinePage from './LinePage';
import { LINE_LIST } from '../../mocks/mockData';
import MESSAGE from '../../constants/message';

const openAddLineModal = () => {
  const addLineButton = screen.getByLabelText('노선 추가');
  fireEvent.click(addLineButton);
};

const openEditLineModal = (targetLine) => {
  const editModalOpenButton = getByLabelText(targetLine, '노선 수정');
  fireEvent.click(editModalOpenButton);
};

const addLine = async (name, distance) => {
  const addModal = await waitFor(() => screen.getByRole('dialog'));
  const lineNameInput = getByRole(addModal, 'textbox', {
    name: '노선 이름',
  });
  const distanceInput = getByRole(addModal, 'spinbutton', {
    name: '거리',
  });
  const addButton = getByRole(addModal, 'button', {
    name: '추가',
  });

  fireEvent.change(lineNameInput, {
    target: {
      value: name,
    },
  });

  fireEvent.change(distanceInput, {
    target: {
      value: distance,
    },
  });

  fireEvent.click(addButton);
};

const editLine = async (name) => {
  const editModal = await waitFor(() => screen.getByRole('dialog'));
  const editLineNameInput = getByPlaceholderText(editModal, '노선 이름');
  const editButton = getByRole(editModal, 'button', {
    name: '수정',
  });

  fireEvent.change(editLineNameInput, {
    target: { value: name },
  });

  fireEvent.click(editButton);
};

describe('지하철 노선 관리', () => {
  beforeEach(() => {
    render(<LinePage />);
  });

  describe('지하철 노선 목록 조회', () => {
    it('지하철 노선 관리 페이지에서 노선 목록을 조회한다', async () => {
      const lineList = await waitFor(() => screen.findAllByRole('listitem'));

      expect(lineList).toHaveLength(LINE_LIST.length);
    });
  });

  describe('지하철 노선 추가', () => {
    it('지하철 노선 추가 시 노선 목록에서 확인할 수 있다', async () => {
      const keyword = '촆호선';
      const distance = '12';

      openAddLineModal();
      await addLine(keyword, distance);

      const cheffe = await waitFor(() => screen.getByText(keyword));
      expect(cheffe).toBeInTheDocument();
    });

    it('지하철 노선 추가 시, 1글자인 노선 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '촆';
      const distance = '12';

      openAddLineModal();
      await addLine(keyword, distance);

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);
      expect(lineList).not.toContain(new RegExp(keyword));
    });

    it('지하철 노선 추가 시, 11글자인 노선 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '11글자인노선이름이다';
      const distance = '12';

      openAddLineModal();
      await addLine(keyword, distance);

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);
      expect(lineList).not.toContain(new RegExp(keyword));
    });
  });

  describe('지하철 노선 이름 수정', () => {
    it('지하철 노선 이름 수정 시 정상적으로 노선 이름이 변경된다.', async () => {
      const keyword = '딭호선';

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetLine] = lineList;

      openEditLineModal(targetLine);
      await editLine(keyword);

      await waitFor(() => expect(targetLine).toHaveTextContent(new RegExp(keyword)));
    });

    it('지하철 노선 수정 시, 1글자인 노선 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '딭';

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetLine] = lineList;

      openEditLineModal(targetLine);
      await editLine(keyword);

      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);
      expect(targetLine).not.toHaveTextContent(new RegExp(keyword));
    });

    it('지하철 노선 수정 시, 11글자인 노선 이름을 입력할 수 없으며, 에러 메시지를 확인할 수 있다.', async () => {
      const keyword = '11글자인노선이름이다';

      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetLine] = lineList;

      openEditLineModal(targetLine);
      await editLine(keyword);

      const alertMessage = await waitFor(() => screen.getByRole('alert'));

      expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH);
      expect(targetLine).not.toHaveTextContent(new RegExp(keyword));
    });
  });

  describe('지하철 노선 삭제', () => {
    it('지하철 노선 삭제 시 노선이 삭제된다.', async () => {
      const lineList = await waitFor(() => screen.findAllByRole('listitem'));
      const [targetLine] = lineList;

      const deleteButton = getByLabelText(targetLine, '노선 삭제');

      fireEvent.click(deleteButton);

      await waitFor(() => expect(targetLine).not.toBeInTheDocument());
    });
  });
});

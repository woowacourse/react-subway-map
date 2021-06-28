import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useLine, useStation, useToggle } from '../../hooks';
import { ButtonSquare, IconPlus, Input, Modal, Section, Select, ColorPicker, IconArrowLTR } from '../../components';
import { LineListItem } from './LineListItem';
import { Form, List, AddButton, CancelButton, StationSelect, ButtonControl, InvalidMessage } from './style';
import { COLOR } from '../../constants';

export const LinePage = () => {
  const { lines, status, requestAddLine, requestDeleteLine, clearStatus } = useLine();
  const { stations } = useStation();
  const [addModeOn, toggleAddMode] = useToggle(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddLine = (e) => {
    e.preventDefault();
    requestAddLine({
      name: e.target.name.value,
      upStationId: e.target.upStation.value,
      downStationId: e.target.downStation.value,
      distance: e.target.distance.value,
      color: e.target.color.value,
    });
  };

  const handleDeleteLine = (_, id) => {
    requestDeleteLine(id);
  };

  useEffect(() => {
    if (status.message) {
      enqueueSnackbar(status.message);
    }
    if (status.isAddSuccess) {
      toggleAddMode();
    }
    clearStatus();
  }, [status]);

  return (
    <Section heading="노선 관리">
      <AddButton onClick={toggleAddMode}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>
      <List>
        {lines?.map((line) => (
          <LineListItem key={line.id} line={line} onClick={handleDeleteLine} />
        ))}
      </List>

      {addModeOn && (
        <Modal>
          <Section heading="노선 추가">
            <Form onSubmit={handleAddLine}>
              {/* eslint-disable jsx-a11y/no-autofocus */}
              <Input
                type="text"
                name="name"
                label="노선 이름"
                placeholder="노선 이름을 입력해주세요."
                autoFocus
                required
              />
              <StationSelect>
                <Select
                  id="upStation"
                  name="upStation"
                  optionHead="상행역"
                  options={stations}
                  selectProps={{ style: { width: '8.5rem' } }}
                />
                <IconArrowLTR />
                <Select
                  id="downStation"
                  name="downStation"
                  optionHead="하행역"
                  options={stations}
                  selectProps={{ style: { width: '8.5rem' } }}
                />
              </StationSelect>
              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />
              <ColorPicker label="노선선택" colors={Object.values(COLOR.LINE)} />
              <InvalidMessage></InvalidMessage>
              <ButtonControl>
                <CancelButton onClick={toggleAddMode}>취소</CancelButton>
                <ButtonSquare>확인</ButtonSquare>
              </ButtonControl>
            </Form>
          </Section>
        </Modal>
      )}
    </Section>
  );
};

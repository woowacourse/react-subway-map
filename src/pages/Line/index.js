import React from 'react';

import { ButtonSquare, ColorPicker, IconArrowLTR, IconPlus, Input, Modal, Section, Select } from '../../components';
import { COLOR } from '../../constants';
import { useLine, useStation } from '../../hooks';
import { LineListItem } from './LineListItem';
import { AddButton, ButtonControl, CancelButton, Form, List, Message, StationSelect } from './style';

export const LinePage = () => {
  const { stations } = useStation();
  const { lines, handleAddLine, handleDeleteLine, isLineModalOpen, handleLineModalOpen, handleLineCloseModal } =
    useLine();

  return (
    <Section heading="노선 관리">
      <AddButton onClick={handleLineModalOpen}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>

      <List>
        {lines?.map((line) => (
          <LineListItem key={line.id} line={line} onClick={handleDeleteLine} />
        ))}
      </List>

      {isLineModalOpen && (
        <Modal>
          <Section heading="노선 추가">
            <Form onSubmit={handleAddLine}>
              <Input
                type="text"
                name="name"
                label="노선 이름"
                placeholder="노선 이름을 입력해주세요."
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                required
              />

              <StationSelect>
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations} />
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations} />
              </StationSelect>

              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />

              <ColorPicker label="노선선택" colors={Object.values(COLOR.LINE)} />
              <Message></Message>

              <ButtonControl>
                <CancelButton onClick={handleLineCloseModal}>취소</CancelButton>
                <ButtonSquare>확인</ButtonSquare>
              </ButtonControl>
            </Form>
          </Section>
        </Modal>
      )}
    </Section>
  );
};

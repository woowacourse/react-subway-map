import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

import { ButtonSquare, IconPlus, Input, Modal, Section, Select, IconArrowLTR } from '../../components';
import { SectionListItem } from './SectionListItem';
import {
  Form,
  List,
  AddButton,
  CancelButton,
  StationSelect,
  ButtonControl,
  LineSelectBox,
  InvalidMessage,
} from './style';
import { COLOR } from '../../constants';

export const SectionPage = (props) => {
  const { endpoint } = props;

  const dispatch = useDispatch();
  const stations = [];
  const map = [];
  const selectedLine = map[0];
  const lines = map.map((section) => ({ id: section.id, name: section.name }));

  const [isSectionAddOpen, setIsSectionAddOpen] = useState(false);

  const handleOpenModal = () => {
    setIsSectionAddOpen(true);
  };

  const handleCloseModal = () => setIsSectionAddOpen(false);

  const handleAddSection = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const upStation = e.target.upStation.value;
    const downStation = e.target.downStation.value;
    const distance = e.target.distance.value;
    const color = e.target.color.value;
  };

  const handleDeleteSection = (e, sectionId) => {};

  return (
    <Section heading="구간 관리">
      <LineSelectBox id="line" name="line" optionHead="노선 선택" options={lines}></LineSelectBox>
      <AddButton onClick={handleOpenModal}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>
      <List>
        {selectedLine?.sections.map((section) => (
          <SectionListItem key={section.id} section={section} onClick={handleDeleteSection} />
        ))}
      </List>

      {isSectionAddOpen && (
        <Modal>
          <Section heading="구간 추가">
            <Form onSubmit={handleAddSection}>
              <LineSelectBox id="line" name="line" optionHead="노선 선택" options={lines}></LineSelectBox>
              <StationSelect>
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations}></Select>
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations}></Select>
              </StationSelect>
              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />
              <InvalidMessage>{}</InvalidMessage>
              <ButtonControl>
                <CancelButton onClick={handleCloseModal}>취소</CancelButton>
                <ButtonSquare>확인</ButtonSquare>
              </ButtonControl>
            </Form>
          </Section>
        </Modal>
      )}
    </Section>
  );
};

SectionPage.propTypes = {
  endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

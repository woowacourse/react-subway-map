import React from 'react';

import { ButtonSquare, IconArrowLTR, IconPlus, Input, Modal, Section, Select } from '../../components';
import { COLOR } from '../../constants';
import { useMap, useStation } from '../../hooks';
import { SectionListItem } from './SectionListItem';
import { AddButton, ButtonControl, CancelButton, Form, LineSelectBox, List, Message, StationSelect } from './style';

export const SectionPage = () => {
  const { stations } = useStation();
  const {
    lines,
    handleAddSection,
    handleDeleteSection,
    handleOpenSectionModal,
    handleCloseSectionModal,
    handleSelectLine,
    isSectionModalOpen,
    selectedLine,
    selectedLineSections,
  } = useMap();

  return (
    <Section heading="구간 관리">
      <LineSelectBox
        id="line"
        name="line"
        optionHead="노선 선택"
        options={lines}
        color={selectedLine.color}
        onChange={handleSelectLine}
      />
      <AddButton onClick={handleOpenSectionModal}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>

      <List>
        {selectedLineSections?.sections.map((section) => (
          <SectionListItem
            key={section.id}
            currentLineName={selectedLine.name}
            color={selectedLine.color}
            section={section}
            onClick={handleDeleteSection}
          />
        ))}
      </List>

      {isSectionModalOpen && (
        <Modal>
          <Section heading="구간 추가">
            <Form onSubmit={handleAddSection}>
              <LineSelectBox id="line" name="line" optionHead="노선 선택" options={lines} />

              <StationSelect>
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations} />
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations} />
              </StationSelect>

              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />
              <Message></Message>

              <ButtonControl>
                <CancelButton onClick={handleCloseSectionModal}>취소</CancelButton>
                <ButtonSquare>확인</ButtonSquare>
              </ButtonControl>
            </Form>
          </Section>
        </Modal>
      )}
    </Section>
  );
};

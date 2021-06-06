import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import { useMap, useStation } from '../../hooks';
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

export const SectionPage = () => {
  const { stations, requestGetStations } = useStation();
  const { map, status, requestGetMap, requestAddSection, requestDeleteSection, clearStatus } = useMap();
  const [isSectionAddOpen, setIsSectionAddOpen] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState(map[0]?.id);
  const selectedLine = map.find((line) => line.id === selectedLineId);
  const lineNames = map.map((section) => ({ id: section.id, name: section.name }));
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenModal = () => setIsSectionAddOpen(true);
  const handleCloseModal = () => setIsSectionAddOpen(false);

  const handleSelectLine = (e) => {
    setSelectedLineId(Number(e.target.value));
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    requestAddSection({
      lineId: e.target.line.value,
      upStationId: e.target.upStation.value,
      downStationId: e.target.downStation.value,
      distance: e.target.distance.value,
    });
  };

  const handleDeleteSection = (_, stationId) => {
    requestDeleteSection({ lineId: selectedLineId, stationId });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    requestGetMap();
    requestGetStations();
  }, []);

  useEffect(() => {
    if (status.message) {
      enqueueSnackbar(status.message);
    }
    if (status.isAddSuccess) {
      setIsSectionAddOpen(false);
      requestGetMap();
    }
    clearStatus();
  }, [status]);

  return (
    <Section heading="구간 관리">
      <LineSelectBox
        id="line"
        name="line"
        optionHead="노선 선택"
        options={lineNames}
        selectProps={{ onChange: handleSelectLine }}
      />
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
              <LineSelectBox id="line" name="line" optionHead="노선 선택" options={lineNames} />
              <StationSelect>
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations} />
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations} />
              </StationSelect>
              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />
              <InvalidMessage></InvalidMessage>
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

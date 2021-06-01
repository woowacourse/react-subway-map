import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../../hooks';
import { getMap, addSection, removeSection, clearMapProgress } from '../../redux/mapSlice';
import { getStations } from '../../redux/stationSlice';

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
import { COLOR, SECTION } from '../../constants';

export const SectionPage = () => {
  const dispatch = useDispatch();
  const { stations } = useSelector((store) => store.station);
  const { map, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.map);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();

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

    const lineId = e.target.line.value;
    const upStationId = e.target.upStation.value;
    const downStationId = e.target.downStation.value;
    const distance = e.target.distance.value;

    dispatch(addSection({ endpoint, accessToken, lineId, upStationId, downStationId, distance }));
  };

  const handleDeleteSection = (e, stationId) => {
    dispatch(removeSection({ endpoint, accessToken, lineId: selectedLineId, stationId }));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getMap({ endpoint, accessToken }));
    dispatch(getStations({ endpoint, accessToken }));
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(SECTION.ADD_SUCCEED);
      dispatch(getMap({ endpoint, accessToken }));
      handleCloseModal();
    }
    if (isAddFail) {
      enqueueSnackbar(SECTION.ADD_FAIL);
    }
    if (isDeleteSuccess) {
      enqueueSnackbar(SECTION.DELETE_SUCCEED);
      dispatch(getMap({ endpoint, accessToken }));
    }
    if (isDeleteFail) {
      enqueueSnackbar(SECTION.DELETE_FAIL);
    }
    dispatch(clearMapProgress());
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

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

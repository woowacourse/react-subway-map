import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';

import { getMap, addSection, removeSection, clearMapProgress } from '../../redux/mapSlice';
import { getStations } from '../../redux/stationSlice';

import { useAuthorization } from '../../hooks';

import { ButtonSquare, IconPlus, Input, Modal, Section, Select, IconArrowLTR } from '../../components';
import { SectionListItem } from './SectionListItem';
import { Form, List, AddButton, CancelButton, StationSelect, ButtonControl, LineSelectBox, Message } from './style';
import { COLOR, SECTION, MESSAGE_TYPE, SHOWING_MESSAGE_TIME, ROUTE } from '../../constants';

export const SectionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { stations } = useSelector((store) => store.station);
  const { map, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.map);

  const { checkIsLogin } = useAuthorization();
  const [isSectionAddOpen, setIsSectionAddOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState({
    id: null,
    name: null,
    color: null,
    distance: null,
    sections: null,
  });
  const selectedLineSections = map.find((line) => line.id === selectedLine.id);

  const lines = map.map((section) => ({ id: section.id, name: section.name, color: section.color }));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (checkIsLogin()) {
      dispatch(getMap());
      dispatch(getStations());
    } else {
      history.push(ROUTE.LOGIN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(SECTION.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      dispatch(getMap());
      handleCloseModal();
    }
    if (isAddFail) {
      enqueueSnackbar(SECTION.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }
    if (isDeleteSuccess) {
      enqueueSnackbar(SECTION.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      dispatch(getMap());
    }
    if (isDeleteFail) {
      enqueueSnackbar(SECTION.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearMapProgress());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

  const handleOpenModal = () => setIsSectionAddOpen(true);
  const handleCloseModal = () => setIsSectionAddOpen(false);

  const handleSelectLine = ({ target: { value } }) => {
    const currentSelectedLine = map.find((line) => line.id === Number(value));

    setSelectedLine({
      id: currentSelectedLine.id,
      name: currentSelectedLine.name,
      color: currentSelectedLine.color,
      distance: currentSelectedLine.distance,
      sections: currentSelectedLine.sections,
    });
  };

  const handleAddSection = (e) => {
    e.preventDefault();

    const lineId = e.target.line.value;
    const upStationId = e.target.upStation.value;
    const downStationId = e.target.downStation.value;
    const distance = e.target.distance.value;

    dispatch(addSection({ lineId, upStationId, downStationId, distance }));
  };

  const handleDeleteSection = (stationId) => dispatch(removeSection({ lineId: selectedLine.id, stationId }));

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
      <AddButton onClick={handleOpenModal}>
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

      {isSectionAddOpen && (
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

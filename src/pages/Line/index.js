import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../../hooks';
import { getStations } from '../../redux/stationSlice';
import { getLines, addLine, removeLine, clearLineProgress } from '../../redux/lineSlice';

import { ButtonSquare, IconPlus, Input, Modal, Section, Select, ColorPicker, IconArrowLTR } from '../../components';
import { LineListItem } from './LineListItem';
import { Form, List, AddButton, CancelButton, StationSelect, ButtonControl, InvalidMessage } from './style';
import { COLOR, LINE } from '../../constants';

export const LinePage = () => {
  const dispatch = useDispatch();
  const { stations } = useSelector((store) => store.station);
  const { lines, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.line);
  const [isLineAddOpen, setIsLineAddOpen] = useState(false);
  const { accessTokenInCookie: accessToken, endpoint } = useCookie();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenModal = () => setIsLineAddOpen(true);
  const handleCloseModal = () => setIsLineAddOpen(false);

  const handleAddLine = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const upStationId = e.target.upStation.value;
    const downStationId = e.target.downStation.value;
    const distance = e.target.distance.value;
    const color = e.target.color.value;

    dispatch(addLine({ endpoint, accessToken, name, upStationId, downStationId, distance, color }));
  };

  const handleDeleteLine = (e, lineId) => {
    dispatch(removeLine({ endpoint, accessToken, id: lineId }));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getLines({ endpoint, accessToken }));
    dispatch(getStations({ endpoint, accessToken }));
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(LINE.ADD_SUCCEED);
      handleCloseModal();
    }

    if (isAddFail) {
      enqueueSnackbar(LINE.ADD_FAIL);
    }

    if (isDeleteSuccess) {
      enqueueSnackbar(LINE.DELETE_SUCCEED);
    }

    if (isDeleteFail) {
      enqueueSnackbar(LINE.DELETE_FAIL);
    }

    dispatch(clearLineProgress());
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

  return (
    <Section heading="노선 관리">
      <AddButton onClick={handleOpenModal}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>
      <List>
        {lines?.map((line) => (
          <LineListItem key={line.id} line={line} onClick={handleDeleteLine} />
        ))}
      </List>

      {isLineAddOpen && (
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

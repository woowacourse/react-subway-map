import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack';

import { getStations } from '../../redux/stationSlice';
import { getLines, addLine, removeLine, clearLineProgress } from '../../redux/lineSlice';

import { ButtonSquare, IconPlus, Input, Modal, Section, Select, ColorPicker, IconArrowLTR } from '../../components';
import { LineListItem } from './LineListItem';

import { Form, List, AddButton, CancelButton, StationSelect, ButtonControl, Message } from './style';
import { COLOR, ACCESS_TOKEN, LINE, SERVER_ID, SERVER_LIST, MESSAGE_TYPE, SHOWING_MESSAGE_TIME } from '../../constants';

export const LinePage = () => {
  const dispatch = useDispatch();
  const { stations } = useSelector((store) => store.station);
  const { lines, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.line);

  const [isLineAddOpen, setIsLineAddOpen] = useState(false);
  const [cookies] = useCookies();
  const accessToken = cookies[ACCESS_TOKEN];

  const { baseUrl } = SERVER_LIST[cookies[SERVER_ID]];
  const { enqueueSnackbar } = useSnackbar();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getLines({ baseUrl, accessToken }));
    dispatch(getStations({ baseUrl, accessToken }));
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(LINE.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      handleCloseModal();
    }

    if (isAddFail) {
      enqueueSnackbar(LINE.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    if (isDeleteSuccess) {
      enqueueSnackbar(LINE.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    if (isDeleteFail) {
      enqueueSnackbar(LINE.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearLineProgress());
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

  const handleOpenModal = () => setIsLineAddOpen(true);
  const handleCloseModal = () => setIsLineAddOpen(false);

  const handleAddLine = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const upStationId = e.target.upStation.value;
    const downStationId = e.target.downStation.value;
    const distance = e.target.distance.value;
    const color = e.target.color.value;

    dispatch(addLine({ baseUrl, accessToken, name, upStationId, downStationId, distance, color }));
  };

  const handleDeleteLine = (lineId) => {
    dispatch(removeLine({ baseUrl, accessToken, id: lineId }));
  };

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
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations} />
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations} />
              </StationSelect>

              <Input type="number" name="distance" label="거리(km)" placeholder="거리를 입력해주세요." required />

              <ColorPicker label="노선선택" colors={Object.values(COLOR.LINE)} />
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

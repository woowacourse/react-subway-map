import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ButtonSquare, ColorPicker, IconArrowLTR, IconPlus, Input, Modal, Section, Select } from '../../components';
import { COLOR, LINE, MESSAGE_TYPE, ROUTE, SHOWING_MESSAGE_TIME } from '../../constants';
import { useAuthorization } from '../../hooks';
import { addLine, clearLineProgress, getLines, removeLine } from '../../redux/lineSlice';
import { fetchStations } from '../../redux/stationSlice';
import { LineListItem } from './LineListItem';
import { AddButton, ButtonControl, CancelButton, Form, List, Message, StationSelect } from './style';

export const LinePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { stations } = useSelector((store) => store.station);
  const { lines, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.line);

  const { checkIsLogin } = useAuthorization();
  const [isLineAddOpen, setIsLineAddOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (checkIsLogin()) {
      dispatch(getLines());
      dispatch(fetchStations());
    } else {
      history.push(ROUTE.LOGIN);
    }
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

    dispatch(addLine({ name, upStationId, downStationId, distance, color }));
  };

  const handleDeleteLine = (id) => {
    dispatch(removeLine({ id }));
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

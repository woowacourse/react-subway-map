import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ButtonSquare, IconSubway, Input, Section } from '../../components';
import { MESSAGE_TYPE, ROUTE, SHOWING_MESSAGE_TIME, STATION } from '../../constants';
import { useAuthorization } from '../../hooks';
import { addStation, clearStationProgress, getStations, removeStation } from '../../redux/stationSlice';
import getInputStatus from '../../services/stationNameValidator';
import { StationListItem } from './StationListItem';
import { Form, InputWrapper, List, Message } from './style';

export const StationPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  const { checkIsLogin } = useAuthorization();
  const [inputStatus, setInputStatus] = useState({ message: '', isValid: false });

  const { stations, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.station);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (checkIsLogin) {
      dispatch(getStations({}));
    } else {
      history.push(ROUTE.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(STATION.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
      ref.current.focus();
      ref.current.value = '';
      inputStatus.isValid = false;
    }
    if (isAddFail) {
      enqueueSnackbar(STATION.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }
    if (isDeleteSuccess) {
      enqueueSnackbar(STATION.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    }
    if (isDeleteFail) {
      enqueueSnackbar(STATION.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearStationProgress());
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

  const handleStationNameInputChange = ({ target: { value } }) => setInputStatus(getInputStatus(value));

  const handleAddStation = (e) => {
    e.preventDefault();

    dispatch(addStation({ name: e.target.name.value }));
  };

  const handleDeleteStation = (stationId) => dispatch(removeStation({ id: stationId }));

  return (
    <Section heading="지하철 역 관리">
      <Form onSubmit={handleAddStation}>
        <InputWrapper>
          <Input
            ref={ref}
            type="text"
            name="name"
            icon={<IconSubway />}
            placeholder="지하철 역 이름을 입력해주세요."
            onChange={handleStationNameInputChange}
            autoFocus
          />
          <Message data-testid="message">{inputStatus.message}</Message>
        </InputWrapper>
        <ButtonSquare disabled={!inputStatus.isValid} data-testid="add-button">
          추가
        </ButtonSquare>
      </Form>

      <List>
        {stations?.map((station) => (
          <StationListItem key={station.id} station={station} onClick={handleDeleteStation} />
        ))}
      </List>
    </Section>
  );
};

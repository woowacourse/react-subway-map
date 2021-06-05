import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';

import { getStations, addStation, clearStationProgress, removeStation } from '../../redux/stationSlice';

import { ButtonSquare, IconSubway, Input, Section } from '../../components';
import { StationListItem } from './StationListItem';

import { Form, List, InputWrapper, Message } from './style';
import { STATION, ACCESS_TOKEN, SERVER_ID, SERVER_LIST, SHOWING_MESSAGE_TIME, MESSAGE_TYPE } from '../../constants';

export const StationPage = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const [cookies] = useCookies([ACCESS_TOKEN]);
  const { baseUrl } = SERVER_LIST[cookies[SERVER_ID]];
  const accessToken = cookies[ACCESS_TOKEN];

  const [inputStatus, setInputStatus] = useState({ message: '', isValid: false });

  const { stations, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.station);
  const { enqueueSnackbar } = useSnackbar();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getStations({ baseUrl, accessToken }));
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

    dispatch(addStation({ baseUrl, accessToken, name: e.target.name.value }));
  };

  const handleDeleteStation = (stationId) => dispatch(removeStation({ baseUrl, accessToken, id: stationId }));

  return (
    <Section heading="지하철 역 관리">
      <Form onSubmit={handleAddStation}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
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

//TODO : Util 함수로 빼기, 정교한 Validation 구현하기, 한글 자음만 입력했을 때 입력되는 문제 삭제하기
function getInputStatus(name) {
  if (name.length > STATION.NAME_LENGTH_MAX) {
    return {
      message: STATION.NAME_IS_TOO_LONG,
      isValid: false,
    };
  } else if (name.length < STATION.NAME_LENGTH_MIN) {
    return {
      message: STATION.NAME_IS_TOO_SHORT,
      isValid: false,
    };
  } else if (name.includes(' ')) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_BLANK,
      isValid: false,
    };
  } else if (name.match(/[a-zA-Z]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_ENGLISH,
      isValid: false,
    };
  } else if (name.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_SPECIAL_CHARACTER,
      isValid: false,
    };
  }
  return {
    message: '',
    isValid: true,
  };
}

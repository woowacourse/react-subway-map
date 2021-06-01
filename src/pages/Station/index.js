import React, { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useCookie } from '../../hooks';
import { getStations, addStation, clearStationProgress, removeStation } from '../../redux/stationSlice';
import { ButtonSquare, IconSubway, Input, Section, StationListItem } from '../../components';
import { Form, List } from './style';
import { STATION } from '../../constants';

export const StationPage = (props) => {
  const { endpoint } = props;

  const dispatch = useDispatch();
  const { stations, isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail } = useSelector((store) => store.station);
  const [inputStatus, setInputStatus] = useState({ message: '', isValid: false });
  const ref = useRef();
  const { accessTokenInCookie: accessToken } = useCookie();
  const { enqueueSnackbar } = useSnackbar();

  const handleStationNameInputChange = (e) => {
    const stationName = e.target.value;

    setInputStatus(getInputStatus(stationName));
  };

  const handleAddStation = (e) => {
    e.preventDefault();

    const stationName = e.target.name.value;

    dispatch(addStation({ endpoint, accessToken, name: stationName }));
  };

  const handleDeleteStation = (e, stationId) => {
    dispatch(removeStation({ endpoint, accessToken, id: stationId }));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getStations({ endpoint, accessToken }));
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      enqueueSnackbar(STATION.ADD_SUCCEED);
      ref.current.focus();
      ref.current.value = '';
    }
    if (isAddFail) {
      enqueueSnackbar(STATION.ADD_FAIL);
    }
    if (isDeleteSuccess) {
      enqueueSnackbar(STATION.DELETE_SUCCEED);
    }
    if (isDeleteFail) {
      enqueueSnackbar(STATION.DELETE_FAIL);
    }
    dispatch(clearStationProgress());
  }, [isAddSuccess, isAddFail, isDeleteSuccess, isDeleteFail]);

  return (
    <Section heading="지하철 역 관리">
      <Form onSubmit={handleAddStation}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Input
          ref={ref}
          type="text"
          name="name"
          icon={<IconSubway />}
          placeholder="지하철 역 이름을 입력해주세요."
          onChange={handleStationNameInputChange}
          hasMessage
          message={inputStatus.message}
          autoFocus
        />
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

StationPage.propTypes = {
  endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

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

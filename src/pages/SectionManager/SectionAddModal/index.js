import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalTemplate, Input, Selector } from '../../../components';
import { COLOR, ERROR, REG_EXP, SIZE } from '../../../constants';
import {
  ButtonWrapper,
  Form,
  LineName,
  SelectorWrapper,
  Validator,
} from './style';
import { Formik } from 'formik';

const initialValues = {
  upStationId: '',
  downStationId: '',
  distance: '',
};

const validateStationId = ({ upStationId, downStationId }) => {
  if (!upStationId || !downStationId) {
    return ERROR.STATION_ID.REQUIRED;
  }
  if (upStationId === downStationId) {
    return ERROR.STATION_ID.DUPLICATE;
  }
};

const validateDistance = ({ distance }) => {
  if (!distance) {
    return ERROR.DISTANCE.REQUIRED;
  }
  if (!REG_EXP.NUMBER.test(distance)) {
    return ERROR.DISTANCE.INVALID;
  }
  if (distance <= 0) {
    return ERROR.DISTANCE.INVALID;
  }
};

const validate = ({ upStationId, downStationId, distance }) => {
  const errors = {};

  errors.stationId = validateStationId({ upStationId, downStationId });

  if (errors.stationId) {
    return errors;
  }

  errors.distance = validateDistance({ distance });

  if (errors.distance) {
    return errors;
  }

  return {};
};

const SectionAddModal = ({ stations, line, closeModal, onClickToClose }) => {
  const handleSubmitForm = (values) => {
    console.log(values);
    closeModal();
  };

  return (
    <ModalTemplate title={'구간 추가'} onClickToClose={onClickToClose}>
      <LineName color={line.color}>{line.name}</LineName>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <Form onSubmit={handleSubmit}>
            <SelectorWrapper>
              <Selector
                label="상행역"
                defaultOption="상행역"
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('upStationId')}
              />
              <span>↔️</span>
              <Selector
                label="하행역"
                defaultOption="하행역"
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('downStationId')}
              />
            </SelectorWrapper>
            {errors.stationId && <Validator>{errors.stationId}</Validator>}
            <Input
              type="text"
              label="거리"
              placeholder="거리"
              size={SIZE.LG}
              {...getFieldProps('distance')}
            />
            {errors.distance && <Validator>{errors.distance}</Validator>}
            <ButtonWrapper>
              <Button type="submit" backgroundColor={COLOR.AMBER}>
                확인
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </ModalTemplate>
  );
};

SectionAddModal.propType = {
  line: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClickToClose: PropTypes.func.isRequired,
};

export default SectionAddModal;

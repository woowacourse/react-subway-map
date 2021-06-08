import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ModalTemplate,
  Input,
  Selector,
  ColorPicker,
} from '../../../components';
import { COLOR, INPUT_TEXT, LINE_COLOR, SIZE } from '../../../constants';
import { TEST } from '../../../constants/test';
import { ButtonWrapper, Form, SelectorWrapper, Validator } from './style';
import { Formik } from 'formik';
import {
  validateDistance,
  validateLineName,
  validateStationId,
} from '../../../utils';

const initialValues = {
  lineName: '',
  upStationId: '',
  downStationId: '',
  distance: '',
};

const validate = ({
  lineName,
  upStationId,
  downStationId,
  distance,
  lines,
}) => {
  const errors = {};

  errors.lineName = validateLineName({ lineName, lines });

  if (errors.lineName) {
    return errors;
  }

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

const LineAddModal = ({ stations, lines, closeModal, addLine }) => {
  const [color, setColor] = useState(LINE_COLOR.DEFAULT);

  const handleSubmitForm = (values) => {
    addLine({ ...values, color });
    closeModal();
  };

  return (
    <ModalTemplate
      title={'노선 생성'}
      onClose={closeModal}
      closeButton={<ModalTemplate.CloseButton onClose={closeModal} />}
    >
      <Formik
        initialValues={initialValues}
        validate={(values) => validate({ ...values, lines })}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              label={INPUT_TEXT.LINE_NAME.LABEL}
              placeholder={INPUT_TEXT.LINE_NAME.LABEL}
              size={SIZE.LG}
              {...getFieldProps('lineName')}
            />
            {errors.lineName && <Validator>{errors.lineName}</Validator>}
            <SelectorWrapper>
              <Selector
                label={INPUT_TEXT.UP_STATION.LABEL}
                defaults={{
                  value: '',
                  option: INPUT_TEXT.UP_STATION.LABEL,
                  disabled: true,
                }}
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('upStationId')}
              />
              <span>↔️</span>
              <Selector
                label={INPUT_TEXT.DOWN_STATION.LABEL}
                defaults={{
                  value: '',
                  option: INPUT_TEXT.DOWN_STATION.LABEL,
                  disabled: true,
                }}
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('downStationId')}
              />
            </SelectorWrapper>
            {errors.stationId && <Validator>{errors.stationId}</Validator>}
            <Input
              type="text"
              label={INPUT_TEXT.DISTANCE.LABEL}
              placeholder={INPUT_TEXT.DISTANCE.LABEL}
              size={SIZE.LG}
              {...getFieldProps('distance')}
            />
            {errors.distance && <Validator>{errors.distance}</Validator>}
            <ColorPicker pickedColor={color} onClickColor={setColor} />
            <ButtonWrapper>
              <Button
                type="submit"
                backgroundColor={COLOR.AMBER}
                data-testid={TEST.ID.LINE_ADD_BUTTON}
              >
                확인
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </ModalTemplate>
  );
};

LineAddModal.propType = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      stations: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  closeModal: PropTypes.func.isRequired,
  addLine: PropTypes.func.isRequired,
};

export default LineAddModal;

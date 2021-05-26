import { Formik } from 'formik';
import React from 'react';
import { PageTemplate, Input, Button, ManagementList } from '../../components';
import {
  ROUTE,
  SIZE,
  COLOR,
  REG_EXP,
  INPUT_TEXT,
  ERROR,
  TEST,
} from '../../constants';
import useStationManager from '../../hooks/useStationManager';
import { Form, InputWrapper, ButtonWrapper, Validator } from './style';

const initialValues = {
  stationName: '',
};

const validate = ({ stationName }, stations) => {
  const errors = {};

  if (!stationName) {
    errors.stationName = ERROR.STATION_NAME.REQUIRED;

    return errors;
  }
  if (!REG_EXP.STATION_NAME.test(stationName)) {
    errors.stationName = ERROR.STATION_NAME.INVALID;

    return errors;
  }
  if (stations.find(({ name }) => name === stationName)) {
    errors.stationName = ERROR.STATION_NAME.DUPLICATE;

    return errors;
  }

  return errors;
};

const StationManager = () => {
  const { stations, addStation, deleteStation } = useStationManager();

  const handleSubmit = (values, { resetForm }) => {
    addStation(values);
    resetForm();
  };

  return (
    <PageTemplate title={ROUTE.STATION_MANAGE.NAME}>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values, stations)}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  type="text"
                  label={INPUT_TEXT.STATION_NAME.LABEL}
                  placeholder={INPUT_TEXT.STATION_NAME.PLACE_HOLDER}
                  size={SIZE.MD}
                  {...getFieldProps('stationName')}
                />
              </InputWrapper>
              <ButtonWrapper>
                <Button
                  type="submit"
                  backgroundColor={COLOR.AMBER}
                  data-testid={TEST.ID.STATION_ADD_BUTTON}
                >
                  추가
                </Button>
              </ButtonWrapper>
            </Form>
            <Validator>{errors.stationName}</Validator>
          </>
        )}
      </Formik>
      {stations && (
        <ManagementList items={stations} onDeleteItem={deleteStation} />
      )}
    </PageTemplate>
  );
};

export default StationManager;

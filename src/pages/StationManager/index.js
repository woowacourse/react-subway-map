import { Formik } from 'formik';
import React from 'react';
import { PageTemplate, Input, Button, ManagementList } from '../../components';
import { ROUTE, COLOR, INPUT_TEXT, TEST } from '../../constants';
import { useStationManager } from '../../hooks';
import { validateStationName } from '../../utils';
import { Form, InputWrapper, ButtonWrapper, Validator } from './style';

const initialValues = {
  stationName: '',
};

const validate = ({ stationName, stations }) => {
  const errors = {};

  errors.stationName = validateStationName({ stationName, stations });

  if (errors.stationName) {
    return errors;
  }

  return {};
};

const StationManager = () => {
  const { stations, addStation, deleteStation } = useStationManager();

  const handleSubmitForm = (values, { resetForm }) => {
    addStation(values);
    resetForm();
  };

  return (
    <PageTemplate title={ROUTE.STATION_MANAGE.NAME}>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate({ ...values, stations })}
        onSubmit={handleSubmitForm}
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
      {stations.length > 0 && (
        <ManagementList items={stations} onDeleteItem={deleteStation} />
      )}
    </PageTemplate>
  );
};

export default StationManager;

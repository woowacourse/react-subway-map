import { Formik } from 'formik';
import React from 'react';
import { PageTemplate, Input, Button, ManagementList } from '../../components';
import { ROUTE, SIZE, COLOR, REG_EXP } from '../../constants';
import useStationManager from '../../hooks/useStationManager';
import { Form, InputWrapper, ButtonWrapper, Validator } from './style';

const initialValues = {
  stationName: '',
};

const validate = ({ stationName }, stations) => {
  const errors = {};

  if (!stationName) {
    errors.stationName = '역 이름을 입력해주세요.';
  }

  if (!REG_EXP.STATION_NAME.test(stationName)) {
    errors.stationName = '올바른 역 이름을 입력해주세요.';
  }

  if (stations.find(({ name }) => name === stationName)) {
    errors.stationName = '중복된 역 이름은 추가할 수 없습니다.';
  }

  console.log(errors);
  return errors;
};

const StationManager = () => {
  const { stations } = useStationManager();

  return (
    <PageTemplate title={ROUTE.STATION_MANAGE.NAME}>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values, stations)}
        onSubmit={() => {}}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <InputWrapper>
                <Input
                  type="text"
                  label="지하철 역 이름을 입력해주세요."
                  placeholder="🚇 2자 ~ 20자 사이의 한글, 숫자 조합"
                  size={SIZE.MD}
                  {...getFieldProps('stationName')}
                />
              </InputWrapper>
              <ButtonWrapper>
                <Button type="submit" backgroundColor={COLOR.AMBER}>
                  추가
                </Button>
              </ButtonWrapper>
            </Form>
            <Validator>{errors.stationName}</Validator>
          </>
        )}
      </Formik>
      {stations && <ManagementList items={stations} />}
    </PageTemplate>
  );
};

export default StationManager;

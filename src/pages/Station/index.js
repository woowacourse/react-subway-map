import React, { useRef, useState } from 'react';

import { ButtonSquare, IconSubway, Input, Section } from '../../components';
import { useStation } from '../../hooks';
import getInputStatus from '../../services/stationNameValidator';
import { StationListItem } from './StationListItem';
import { Form, InputWrapper, List, Message } from './style';

export const StationPage = () => {
  const ref = useRef();

  const { stations, handleAddStation, handleDeleteStation } = useStation(ref);

  const [inputStatus, setInputStatus] = useState({ message: '', isValid: false });
  const handleStationNameInputChange = ({ target: { value } }) => setInputStatus(getInputStatus(value));

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

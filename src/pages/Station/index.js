import React from 'react';
import { PropTypes } from 'prop-types';

import { Button, ButtonSquare, IconSubway, IconTrashCan, Input, Section } from '../../components';
import { Form, List, Item, Name } from './style';

const StationListItem = (props) => {
  const { station, server } = props;
  const handleDeleteStation = () => {
    // TODO: station.id로 server에 삭제 요청
  };

  return (
    <Item>
      <Name>{station.name}</Name>
      <Button onClick={handleDeleteStation}>
        <IconTrashCan />
      </Button>
    </Item>
  );
};

export const StationPage = (props) => {
  const { server } = props;
  const stationList = [];
  const handleAddStation = (e) => {
    e.preventDefault();
  };

  return (
    <Section heading="지하철 역 관리">
      <Form onSubmit={handleAddStation}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Input type="text" name="name" icon={<IconSubway />} placeholder="지하철 역 이름을 입력해주세요." autoFocus />
        <ButtonSquare>추가</ButtonSquare>
      </Form>
      <List>
        {stationList.map((station) => (
          <StationListItem station={station} />
        ))}
      </List>
    </Section>
  );
};

StationPage.propTypes = {
  server: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    nickname: PropTypes.string,
    endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
};

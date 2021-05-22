import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { ButtonSquare, Modal, Section, ServerSelectItem } from '../..';
import { ServerList, Form } from './style';
import { ROUTE, SERVER_LIST } from '../../../constants';

export const ServerSelect = () => {
  const [server, setServer] = useState(null);
  const history = useHistory();

  const handleServerChange = (e) => {
    setServer(e.target.value);
  };

  const handleServerSubmit = (e) => {
    e.preventDefault();
    history.push(ROUTE.STATION);
  };

  return (
    <Modal>
      <Section heading="서버 선택">
        <Form onSubmit={handleServerSubmit}>
          <ServerList>
            {SERVER_LIST.map((owner) => (
              <ServerSelectItem
                key={owner.id}
                ownerName={owner.name}
                ownerNickname={owner.nickName}
                ownerImgSrc={owner.imgSrc}
                onChange={handleServerChange}
                isChecked={owner.id === server}
                value={owner.id}
              />
            ))}
          </ServerList>
          <ButtonSquare>확인</ButtonSquare>
        </Form>
      </Section>
    </Modal>
  );
};

ServerSelect.propTypes = {
  children: PropTypes.node,
};

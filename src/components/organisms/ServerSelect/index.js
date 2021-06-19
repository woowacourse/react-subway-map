import { PropTypes } from 'prop-types';
import React from 'react';

import { SERVER_LIST } from '../../../constants';
import { ButtonSquare, Modal, Section, ServerSelectItem } from '../..';
import { Form, ServerList } from './style';

export const ServerSelect = (props) => {
  const { serverId, onSubmit, ...rest } = props;

  return (
    <Modal>
      <Section heading="서버 선택" {...rest}>
        <Form onSubmit={onSubmit}>
          <ServerList>
            {Object.values(SERVER_LIST).map((owner) => (
              <ServerSelectItem
                key={owner.id}
                ownerName={owner.name}
                ownerNickname={owner.nickname}
                ownerImgSrc={owner.imgSrc}
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
  serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubmit: PropTypes.func.isRequired,
};

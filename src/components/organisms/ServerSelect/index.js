import React from 'react';
import { PropTypes } from 'prop-types';

import { ButtonSquare, Modal, Section, ServerSelectItem } from '../..';
import { ServerList, Form } from './style';
import { SERVER_LIST } from '../../../constants';

export const ServerSelect = (props) => {
  const { serverId, onChange, onSubmit, ...rest } = props;

  return (
    <Modal>
      <Section heading="서버 선택" {...rest}>
        <Form onSubmit={onSubmit}>
          <ServerList>
            {Object.values(SERVER_LIST).map((owner) => (
              <ServerSelectItem
                key={owner.id}
                ownerName={owner.name}
                ownerNickname={owner.nickName}
                ownerImgSrc={owner.imgSrc}
                onChange={onChange}
                isChecked={owner.id === serverId}
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
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

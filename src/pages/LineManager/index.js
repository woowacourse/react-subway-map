import React from 'react';
import { Button, PageTemplate, ModalTemplate, Input } from '../../components';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { useModal } from '../../hooks';
import { ButtonWrapper, Form } from './style';

const LineAddModal = ({ onClickToClose }) => (
  <ModalTemplate title={'노선 생성'} onClickToClose={onClickToClose}>
    <Form>
      <Input
        type="text"
        name="line-name"
        label="노선 이름"
        placeholder="노선 이름"
        size={SIZE.LG}
      />
      <Input
        type="text"
        name="line-distance"
        label="거리"
        placeholder="거리"
        size={SIZE.LG}
      />
    </Form>
  </ModalTemplate>
);

const LineManager = (props) => {
  const { isModalOpen, openModal, handleClickToClose } = useModal();

  return (
    <>
      <PageTemplate title={ROUTE.LINE_MANAGE.NAME}>
        <ButtonWrapper>
          <Button backgroundColor={COLOR.AMBER} onClick={openModal}>
            노선 추가
          </Button>
        </ButtonWrapper>
        {/* {lines && <ManagementList items={lines}/>} */}
      </PageTemplate>
      {isModalOpen && <LineAddModal onClickToClose={handleClickToClose} />}
    </>
  );
};

export default LineManager;

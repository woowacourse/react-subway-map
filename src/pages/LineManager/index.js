import React from 'react';
import { Button, PageTemplate } from '../../components';
import ModalTemplate from '../../components/commons/ModalTemplate';
import { COLOR, ROUTE } from '../../constants';
import { useModal } from '../../hooks';
import { ButtonWrapper } from './style';

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
      {isModalOpen && (
        <ModalTemplate onClickToClose={handleClickToClose}></ModalTemplate>
      )}
    </>
  );
};

export default LineManager;

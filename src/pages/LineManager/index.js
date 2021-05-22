import React from 'react';
import { Button, PageTemplate } from '../../components';
import { COLOR, ROUTE } from '../../constants';
import { useModal } from '../../hooks';
import LineAddModal from './LineAddModal';
import { ButtonWrapper } from './style';

const LineManager = () => {
  const { isModalOpen, openModal, handleClickToClose } = useModal();

  return (
    <>
      <PageTemplate title={ROUTE.LINE_MANAGE.NAME}>
        <ButtonWrapper>
          <Button
            type="button"
            backgroundColor={COLOR.AMBER}
            onClick={openModal}
          >
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

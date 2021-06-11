import React from 'react';
import { Button, ManagementList, PageTemplate } from '../../components';
import { COLOR, ROUTE } from '../../constants';
import { useLineManager, useModal, useStationManager } from '../../hooks';
import LineAddModal from './LineAddModal';
import { ButtonWrapper } from './style';

const LineManager = () => {
  const { stations } = useStationManager();
  const { lines, addLine, deleteLine } = useLineManager();
  const { isModalOpen, openModal, closeModal } = useModal();

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
        {lines.length > 0 && (
          <ManagementList items={lines} deleteItem={deleteLine} />
        )}
      </PageTemplate>
      {isModalOpen && (
        <LineAddModal
          stations={stations}
          lines={lines}
          closeModal={closeModal}
          addLine={addLine}
        />
      )}
    </>
  );
};

export default LineManager;

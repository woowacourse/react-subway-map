import React from 'react';
import {
  PageTemplate,
  Selector,
  ManagementList,
  Button,
} from '../../components';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { useModal } from '../../hooks';
import SectionAddModal from './SectionAddModal';
import { ListHeader, Title } from './style';

const SectionList = ({ line, openModal }) => (
  <>
    <ListHeader>
      <Title color={line.color}>{line.name}</Title>
      <Button
        type="button"
        backgroundColor={COLOR.AMBER}
        onClick={openModal}
        hasShadow
      >
        ➕
      </Button>
    </ListHeader>
    <ManagementList items={[]}></ManagementList>
  </>
);

const selectedLine = { id: 1, name: '분당선', color: COLOR.GRAY_300 };

const SectionManager = () => {
  const { isModalOpen, openModal, handleClickToClose } = useModal();

  return (
    <>
      <PageTemplate title={ROUTE.SECTION_MANAGE.NAME}>
        <Selector
          name="section-select-line"
          label="노선 선택"
          defaultOption="노선 선택"
          options={[]}
          size={SIZE.MD}
        ></Selector>
        {selectedLine && (
          <SectionList line={selectedLine} openModal={openModal} />
        )}
      </PageTemplate>
      {isModalOpen && (
        <SectionAddModal
          line={selectedLine}
          onClickToClose={handleClickToClose}
        />
      )}
    </>
  );
};

export default SectionManager;

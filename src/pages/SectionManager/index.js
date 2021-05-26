import React, { useState } from 'react';
import {
  PageTemplate,
  Selector,
  ManagementList,
  Button,
} from '../../components';
import { COLOR, ROUTE, SIZE } from '../../constants';
import { useLineManager, useModal, useStationManager } from '../../hooks';
import SectionAddModal from './SectionAddModal';
import { ListHeader, Title } from './style';

const initailLineState = {
  id: '',
  name: '',
  color: '',
  stations: [],
};

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
    <ManagementList
      items={line.stations}
      onDeleteItem={() => {}}
    ></ManagementList>
  </>
);

const SectionManager = () => {
  const [selectedLine, setSelectedLine] = useState(initailLineState);
  const { stations } = useStationManager();
  const { lines } = useLineManager();
  const { isModalOpen, openModal, closeModal, handleClickToClose } = useModal();

  const handleChangeSelecter = (event) => {
    const targetId = Number(event.target.value);
    const targetLine = lines.find(({ id }) => id === targetId);

    setSelectedLine(targetLine);
  };

  return (
    <>
      <PageTemplate title={ROUTE.SECTION_MANAGE.NAME}>
        <Selector
          name="section-select-line"
          label="노선 선택"
          defaultOption="노선 선택"
          options={lines}
          size={SIZE.MD}
          value={selectedLine.id}
          onChange={handleChangeSelecter}
        ></Selector>
        {selectedLine.stations.length > 0 && (
          <SectionList line={selectedLine} openModal={openModal} />
        )}
      </PageTemplate>
      {isModalOpen && (
        <SectionAddModal
          stations={stations}
          line={selectedLine}
          closeModal={closeModal}
          onClickToClose={handleClickToClose}
        />
      )}
    </>
  );
};

export default SectionManager;

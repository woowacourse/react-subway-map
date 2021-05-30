import React from 'react';
import {
  PageTemplate,
  Selector,
  ManagementList,
  Button,
} from '../../components';
import { COLOR, ROUTE } from '../../constants';
import {
  useLineManager,
  useModal,
  useSectionManager,
  useStationManager,
} from '../../hooks';
import SectionAddModal from './SectionAddModal';
import { ListHeader, Title } from './style';

const initialLineState = {
  id: '',
  name: '',
  color: '',
  stations: [],
};

const SectionList = ({ line, openModal, deleteSection }) => (
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
      onDeleteItem={({ id }) =>
        deleteSection({ lineId: line.id, stationId: id })
      }
    ></ManagementList>
  </>
);

const SectionManager = () => {
  const { stations } = useStationManager();
  const { lines } = useLineManager();
  const { selectedLineId, setSelectedLineId, addSection, deleteSection } =
    useSectionManager();
  const { isModalOpen, openModal, closeModal, handleClickToClose } = useModal();

  const handleChangeSelector = (event) => {
    const targetId = Number(event.target.value);

    setSelectedLineId(targetId);
  };

  const selectedLine =
    lines.find(({ id }) => id === selectedLineId) ?? initialLineState;

  return (
    <>
      <PageTemplate title={ROUTE.SECTION_MANAGE.NAME}>
        <Selector
          name="section-select-line"
          label="노선 선택"
          defaults={{
            value: '',
            option: '노선 선택',
            disabled: true,
          }}
          options={lines}
          value={selectedLineId}
          onChange={handleChangeSelector}
        />
        {selectedLine.stations.length > 0 && (
          <SectionList
            line={selectedLine}
            openModal={openModal}
            deleteSection={deleteSection}
          />
        )}
      </PageTemplate>
      {isModalOpen && (
        <SectionAddModal
          stations={stations}
          line={selectedLine}
          addSection={addSection}
          closeModal={closeModal}
          onClickToClose={handleClickToClose}
        />
      )}
    </>
  );
};

export default SectionManager;

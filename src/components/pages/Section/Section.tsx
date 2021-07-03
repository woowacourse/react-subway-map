/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeEvent, useLine, useModal, useSection, useStation } from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox, ScrollBox } from '../../../styles/shared';
import { IStationRes } from '../../../type';
import { Button, Header, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { FormProvider } from '../../contexts/FormContext/FormContext';
import { ListItem, Modal, SectionAddForm } from '../../molecules';
import { SelectContainer } from './Section.styles';

const Section = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { stations, getAllStations } = useStation(host);
  const { lines, getAllLines } = useLine(host);
  const { addSection, addSectionResponse, deleteSection, deleteSectionResponse } = useSection(host);
  const { close: closeModal, open: openModal, isModalOpen, onClickClose } = useModal(false);

  const { value: lineId, onChange: onChangeLineId } = useChangeEvent('');

  const currentLineColor = lines?.find(line => line.id === Number(lineId))?.color;

  const lineOptions: IOption[] = lines?.map(({ id, name }) => ({ value: id, name })) || [];

  const stationsOfSelectedLine: IStationRes[] =
    lines?.find(({ id }) => id === Number(lineId))?.stations || [];

  const onDeleteSection = (stationId: number) => {
    if (!confirm('해당 구간을 정말로 삭제하시겠습니까?')) return;

    deleteSection(`${lineId}/sections?stationId=${stationId}`);
  };

  useEffect(() => {
    getAllLines();
  }, [addSectionResponse, deleteSectionResponse]);

  useEffect(() => {
    getAllStations();
    getAllLines();
  }, []);

  return (
    <FullVerticalCenterBox>
      <Header hasExtra>
        <h3>🚉 구간 관리</h3>
        <Button onClick={openModal}>구간 추가</Button>
      </Header>
      <SelectContainer>
        <Select
          options={lineOptions}
          onChange={onChangeLineId}
          defaultName="노선을 선택해주세요"
          value={lineId}
          css={css`
            border: 6px solid ${currentLineColor};
          `}
        />
      </SelectContainer>

      <ScrollBox>
        {stationsOfSelectedLine.map(({ id: stationId, name }) => {
          return (
            <ListItem
              key={stationId}
              content={name}
              onClickDelete={() => onDeleteSection(stationId)}
            />
          );
        })}
      </ScrollBox>

      {isModalOpen && (
        <Modal onClickClose={onClickClose}>
          <Header>
            <h3>🔁 구간 추가</h3>
          </Header>
          <FormProvider submitFunc={addSection}>
            <SectionAddForm
              stationList={stations || []}
              lineList={lines || []}
              lineId={Number(lineId)}
              onChangeLine={onChangeLineId}
              closeModal={closeModal}
            />
          </FormProvider>
        </Modal>
      )}
    </FullVerticalCenterBox>
  );
};

export default Section;

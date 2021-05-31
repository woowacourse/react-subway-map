import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, RESPONSE_MESSAGE } from '../../../constants';
import {
  useGetAllRequest,
  useLineInput,
  useModal,
  usePostRequest,
  useDeleteRequest,
} from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox, ScrollBox } from '../../../styles/shared';
import { ILineRes, ISectionReq, IStationRes } from '../../../type';
import { isValidUpDownStation } from '../../../utils';
import { Button, Header, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { ListItem, Modal, SectionAddForm } from '../../molecules';
import { SelectContainer } from './Section.styles';

const Section = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { allData: lines, getAllData: getAllLines } = useGetAllRequest<ILineRes>(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );
  const { postData: addSection, dataResponse: addSectionResponse } = usePostRequest(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );

  const { deleteData: deleteSection, dataResponse: deleteSectionResponse } = useDeleteRequest(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );

  const { allData: stations, getAllData: getAllStations } = useGetAllRequest<IStationRes>(
    BASE_URL.STATION(host),
    RESPONSE_MESSAGE.SECTION,
  );

  const { close: closeModal, open: openModal, isModalOpen, onClickClose } = useModal(false);

  const {
    lineInput: lineId,
    onChangeLineInput: onChangeLineId,

    distance,
    onChangeDistance,

    upStationId,
    onChangeUpStationId,

    downStationId,
    onChangeDownStationId,

    resetForm,
  } = useLineInput();

  const lineOptions: IOption[] = lines?.map(({ id, name }) => ({ value: id, name })) || [];

  const displayStations: IStationRes[] =
    lines?.find(({ id }) => id === Number(lineId))?.stations || [];

  const onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isValidUpDownStation(upStationId, downStationId)) {
      window.alert('상행선, 하행선을 선택해주세요');

      return;
    }

    if (upStationId === downStationId) {
      window.alert('상행선, 하행선은 달라야 합니다');

      return;
    }

    const body: ISectionReq = {
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    };

    addSection<ISectionReq>(body, `${lineId}/sections`);

    resetForm();
    closeModal();
  };

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
          selectValue={lineId}
          defaultName="노선을 선택해주세요"
        />
      </SelectContainer>

      <ScrollBox>
        {displayStations.map(({ id: stationId, name }) => {
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
            <h3>{'🔁 구간 추가'}</h3>
          </Header>
          <SectionAddForm
            stationList={stations || []}
            lineList={lines || []}
            lineId={Number(lineId)}
            onChangeLine={onChangeLineId}
            onChangeUpStation={onChangeUpStationId}
            upStation={Number(upStationId)}
            onChangeDownStation={onChangeDownStationId}
            downStation={Number(downStationId)}
            onChangeDistance={onChangeDistance}
            distance={Number(distance)}
            onSubmitSectionInfo={onSubmitSectionInfo}
          />
        </Modal>
      )}
    </FullVerticalCenterBox>
  );
};

export default Section;

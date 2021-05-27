import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ROUTE } from '../../../constants';
import { useChangeEvent, useModal, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { ILineRes, ISectionReq, IStationRes } from '../../../type';
import { Button, Header, Select } from '../../atoms';
import { ListItem, Modal, SectionAddForm } from '../../molecules';
import { Container, SelectContainer } from './Section.styles';
import { IOption } from '../../atoms/Select/Select';
import { useEffect } from 'react';

const Section = () => {
  const { close: closeModal, open: openModal, isModalOpen, onClickClose } = useModal(false);
  const {
    signedUser: { id: signedUserId },
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { signedUser: state.signedUserReducer, hostState: state.hostReducer };
  });

  const {
    allData: stations,
    getAllData: getAllStations,
    getAllDataResponse: getAllStationResponse,
  } = useServerAPI<IStationRes>(`${host}/stations`);

  const {
    allData: lines,
    getAllData: getAllLines,
    getAllDataResponse: getAllLineResponse,

    deleteData: deleteSection,
    deleteDataResponse: deleteSectionResponse,
    postData: addSection,
    postDataResponse: addSectionResponse,
  } = useServerAPI<ILineRes>(`${host}/lines`);

  const { value: lineId, onChange: onChangeLineId } = useChangeEvent('');

  const {
    value: distance,
    onChange: onChangeDistance,
    setValue: setDistance,
  } = useChangeEvent('1');

  const {
    value: upStationId,
    onChange: onChangeUpStationId,
    setValue: setUpStationId,
  } = useChangeEvent('');

  const {
    value: downStationId,
    onChange: onChangeDownStationId,
    setValue: setDownStationId,
  } = useChangeEvent('');

  if (!signedUserId) {
    window.alert('로그인이 필요합니다.');
    return <Redirect to={ROUTE.LOGIN} />;
  }
  const lineOptions: IOption[] = lines?.map(({ id, name }) => ({ value: id, name })) || [];

  const displayStations: IStationRes[] =
    lines?.find(({ id }) => id === Number(lineId))?.stations || [];

  const resetForm = () => {
    setDistance('1');
    setUpStationId('');
    setDownStationId('');
  };

  const onSubmitSectionInfo: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (upStationId === '' || downStationId === '') {
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
    if (addSectionResponse?.isError === true) {
      window.alert(addSectionResponse.message);
    } else if (addSectionResponse?.isError === false) {
      window.alert('구간 추가 성공');
    }
  }, [addSectionResponse]);

  useEffect(() => {
    if (deleteSectionResponse?.isError === true) {
      window.alert(deleteSectionResponse.message);
    } else if (deleteSectionResponse?.isError === false) {
      window.alert('구간 제거 성공');
    }
  }, [deleteSectionResponse]);

  useEffect(() => {
    if (getAllStationResponse?.isError === true) {
      window.alert(getAllStationResponse.message);
    }
  }, [getAllStationResponse]);

  useEffect(() => {
    if (getAllLineResponse?.isError === true) {
      window.alert(getAllLineResponse.message);
    }
  }, [getAllLineResponse]);

  useEffect(() => {
    getAllLines();
  }, [addSectionResponse, deleteSectionResponse]);

  useEffect(() => {
    getAllStations();
    getAllLines();
  }, []);

  return (
    <Container>
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

      <div>
        {displayStations.map(({ id: stationId, name }) => {
          return (
            <ListItem
              key={stationId}
              content={name}
              onClickDelete={() => {
                onDeleteSection(stationId);
              }}
            />
          );
        })}
      </div>

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
    </Container>
  );
};

export default Section;

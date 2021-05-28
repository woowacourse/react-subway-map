import React, { ChangeEventHandler, FormEventHandler, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Card, Input, Select, ColorDot, Modal, MessageBox } from '../../components';
import * as Styled from './SectionPage.styles';
import { ReactComponent as AddIcon } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as HorizontalArrowIcon } from '../../assets/icons/arrows-alt-h-solid.svg';
import useModal from '../../hooks/useModal';
import useSelect from '../../hooks/useSelect';
import useInput from '../../hooks/useInput';
import useStation from '../../hooks/useStation';
import useLine from '../../hooks/useLine';
import { ApiStatus, Station } from '../../types';
import MESSAGE from '../../constants/message';

const SectionPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { list: stationList } = useStation();
  const {
    list: lineList,
    status: lineStatus,
    isLoading: isLoadingLineList,
    onAddSection,
    onDeleteSection,
  } = useLine();

  const {
    valueAsNumber: selectedLineId,
    setValue: setSelectedLineId,
    onChange: onChangeSelectedLineId,
  } = useSelect('');
  const { valueAsNumber: upStationId, setValue: setUpStationId } = useSelect('');
  const {
    valueAsNumber: downStationId,
    setValue: setDownStationId,
    onChange: onChangeDownStationId,
  } = useSelect('');
  const {
    value: distanceValue,
    valueAsNumber: distance,
    setValue: setDistance,
    onChange: onChangeDistance,
  } = useInput('');

  const selectedLine = lineList.find((line) => line.id === selectedLineId) || lineList[0];

  const downStationList = stationList.filter((station) => station.id !== upStationId);

  const selectedUpStation = selectedLine?.stations.find(
    (lineStation) => lineStation.id === upStationId
  );

  const handleChangeUpStationId: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedStationId = event.target.value;
    setUpStationId(selectedStationId);

    if (downStationId !== Number(selectedStationId)) return;

    const [firstDownStationId] = downStationList.map((station) => station.id);

    setDownStationId(`${firstDownStationId}`);
  };

  const handleAdd: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await onAddSection({
      lineId: selectedLineId,
      data: {
        upStationId,
        downStationId,
        distance,
      },
    });

    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.SECTION_ADDED, {
      variant: 'success',
    });
    closeModal();
    setDistance('');
  };

  const handleDelete = async (stationId: Station['id']) => {
    if (selectedLine?.stations.length <= 2) {
      enqueueSnackbar(MESSAGE.ERROR.REQUIRE_MINIMUM_STATION, {
        variant: 'warning',
      });
      return;
    }

    const response = await onDeleteSection({ lineId: selectedLineId, stationId });
    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.SECTION_DELETED);
  };

  useEffect(() => {
    if (lineList.length > 0 && !selectedLineId) {
      setSelectedLineId(`${lineList[0].id}`);
    }
  }, [lineList, selectedLineId, setSelectedLineId]);

  useEffect(() => {
    if (stationList.length > 1) {
      const [firstStationId, secondStationId] = stationList.map((station) => station.id);
      setUpStationId(`${firstStationId}`);
      setDownStationId(`${secondStationId}`);
    }
  }, [selectedLine, setDownStationId, setUpStationId, stationList]);

  return (
    <>
      <Styled.SectionPage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 구간 관리</Styled.HeaderText>
              {lineStatus === ApiStatus.FULFILLED && lineList.length === 0 && (
                <MessageBox emoji="👻">구간 목록이 비어있습니다</MessageBox>
              )}
              {lineList.length > 0 && (
                <>
                  <Styled.LineSelectWrapper>
                    <Select
                      labelText="노선 선택"
                      value={selectedLineId}
                      onChange={onChangeSelectedLineId}
                    >
                      {lineList.map((line) => (
                        <option key={line.id} value={line.id}>
                          {line.name}
                        </option>
                      ))}
                    </Select>
                  </Styled.LineSelectWrapper>
                  <Styled.Control>
                    <Styled.Divider />
                    <Styled.ButtonList>
                      <Button shape="circle" onClick={openModal}>
                        <AddIcon />
                      </Button>
                    </Styled.ButtonList>
                  </Styled.Control>
                  {!isLoadingLineList && (
                    <>
                      <Styled.LineHeader>
                        <ColorDot color={selectedLine?.color} />
                        <Styled.LineName>{selectedLine?.name}</Styled.LineName>
                      </Styled.LineHeader>
                      <Styled.List>
                        {selectedLine?.stations.map((station) => (
                          <Styled.Item key={station.id}>
                            <Styled.StationName>{station.name}</Styled.StationName>
                            <Styled.OptionWrapper>
                              <Button
                                shape="circle"
                                variant="text"
                                onClick={() => handleDelete(station.id)}
                              >
                                <TrashIcon />
                              </Button>
                            </Styled.OptionWrapper>
                          </Styled.Item>
                        ))}
                      </Styled.List>
                    </>
                  )}
                </>
              )}
            </Card>
          </Styled.FormContainer>
        </Styled.Container>
      </Styled.SectionPage>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Styled.ModalTitle>구간 생성</Styled.ModalTitle>
        <Styled.Form onSubmit={handleAdd}>
          <Styled.SelectWrapper>
            <Select
              labelText="노선 선택"
              value={selectedLineId}
              onChange={onChangeSelectedLineId}
              required
            >
              {lineList.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </Select>
          </Styled.SelectWrapper>
          <Styled.SelectWrapper>
            <Select
              labelText="상행역"
              value={upStationId}
              onChange={handleChangeUpStationId}
              required
            >
              {stationList.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Select>
            <HorizontalArrowIcon />
            <Select
              labelText="하행역"
              value={downStationId}
              onChange={onChangeDownStationId}
              required
            >
              {downStationList?.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Select>
          </Styled.SelectWrapper>
          <Styled.InputWrapper>
            <Input
              type="number"
              labelText="거리"
              placeholder="거리"
              value={distanceValue}
              onChange={onChangeDistance}
              min={1}
              max={selectedUpStation?.distance !== 0 ? selectedUpStation?.distance : undefined}
              required
            />
          </Styled.InputWrapper>
          <Styled.ButtonWrapper>
            <Button variant="text" type="button" onClick={closeModal}>
              취소
            </Button>
            <Button>추가</Button>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Modal>
    </>
  );
};

export default SectionPage;

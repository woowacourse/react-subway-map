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
import { Station } from '../../types';
import MESSAGE from '../../constants/message';
import useSection from '../../hooks/useSection';
import { SECTION } from '../../constants/data';

const SectionPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { stationList, lineList, requestAddSection, requestDeleteSection, isLoading } =
    useSection();

  const {
    value: selectedLineId,
    setValue: setSelectedLineId,
    onChangeNumber: onChangeSelectedLineId,
  } = useSelect(-1);
  const { value: upStationId, setValue: setUpStationId } = useSelect(-1);
  const {
    value: downStationId,
    setValue: setDownStationId,
    onChangeNumber: onChangeDownStationId,
  } = useSelect(-1);
  const { value: distance, setValue: setDistance, onChangeNumber: onChangeDistance } = useInput(-1);

  const selectedLine = lineList.find((line) => line.id === selectedLineId) || lineList[0];

  const downStationList = stationList.filter((station) => station.id !== upStationId);

  const selectedUpStation = selectedLine?.stations.find(
    (lineStation) => lineStation.id === upStationId
  );

  const handleChangeUpStationId: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedStationId = Number(event.target.value);
    setUpStationId(selectedStationId);

    if (downStationId !== selectedStationId) return;

    const [firstDownStationId] = downStationList.map((station) => station.id);

    setDownStationId(firstDownStationId);
  };

  const handleAdd: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isSuccess = await requestAddSection({
      lineId: selectedLineId,
      data: {
        upStationId,
        downStationId,
        distance,
      },
    });

    if (!isSuccess) return;

    closeModal();
    setDistance(-1);
  };

  const handleDelete = (stationId: Station['id']) => {
    if (selectedLine?.stations.length < SECTION.MIN_QUANTITY_STATION_TO_DELETE_SECTION) {
      enqueueSnackbar(MESSAGE.ERROR.REQUIRE_MINIMUM_STATION, {
        variant: 'warning',
      });

      return;
    }

    requestDeleteSection({ lineId: selectedLineId, stationId });
  };

  useEffect(() => {
    if (lineList.length > 0 && selectedLineId === -1) {
      setSelectedLineId(lineList[0].id);
    }
  }, [lineList, selectedLineId, setSelectedLineId]);

  useEffect(() => {
    if (stationList.length > 1) {
      const [firstStationId, secondStationId] = stationList.map((station) => station.id);
      setUpStationId(firstStationId);
      setDownStationId(secondStationId);
    }
  }, [selectedLine, setDownStationId, setUpStationId, stationList]);

  return (
    <>
      <Styled.SectionPage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 구간 관리</Styled.HeaderText>
              {!isLoading && lineList.length === 0 && (
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
                      <Button shape="circle" onClick={openModal} aria-label="구간 추가">
                        <AddIcon />
                      </Button>
                    </Styled.ButtonList>
                  </Styled.Control>

                  <Styled.LineHeader>
                    <ColorDot color={selectedLine?.color} />
                    <Styled.LineName>{selectedLine?.name}</Styled.LineName>
                  </Styled.LineHeader>
                  <Styled.List>
                    {selectedLine?.stations.map((station) => (
                      <Styled.Item key={station.id}>
                        <Styled.StationName>{station.name}</Styled.StationName>
                        {station.distance ? (
                          <Styled.StationDistance>거리: {station.distance}</Styled.StationDistance>
                        ) : null}
                        <Styled.OptionWrapper>
                          <Button
                            shape="circle"
                            variant="text"
                            aria-label="구간 삭제"
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
              value={distance === -1 ? '' : distance}
              onChange={onChangeDistance}
              min={1}
              max={
                selectedUpStation?.distance === -1 || !selectedUpStation?.distance
                  ? ''
                  : selectedUpStation?.distance
              }
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

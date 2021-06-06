import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Button,
  Card,
  ColorDot,
  Input,
  Select,
  ColorPalette,
  Modal,
  MessageBox,
} from '../../components';
import { ApiStatus, Line } from '../../types';
import * as Styled from './LinePage.styles';
import { ReactComponent as AddIcon } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';
import { ReactComponent as HorizontalArrowIcon } from '../../assets/icons/arrows-alt-h-solid.svg';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useSelect from '../../hooks/useSelect';
import useLine from '../../hooks/useLine';
import useStation from '../../hooks/useStation';
import useColorPalette from '../../hooks/useColorPalette';
import MESSAGE from '../../constants/message';
import { LINE } from '../../constants/data';

const LinePage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    isModalOpen: isAddModalOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = useModal();
  const {
    isModalOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  const { stationList } = useStation();
  const {
    requestAddLine,
    requestEditLine,
    requestDeleteLine,
    lineList,
    status: lineStatus,
  } = useLine();

  const { color, onChange: onChangeColor } = useColorPalette();
  const { color: editColor, onChange: onChangeEditColor } = useColorPalette();

  const [editLineId, setEditLineId] = useState<Line['id']>(-1);

  const { value: name, setValue: setName, onChange: onChangeName } = useInput('');
  const { value: editName, setValue: setEditName, onChange: onChangeEditName } = useInput('');
  const { value: distance, setValue: setDistance, onChangeNumber: onChangeDistance } = useInput(-1);
  const { value: upStationId, setValue: setUpStationId } = useSelect(-1);
  const {
    value: downStationId,
    onChangeNumber: onChangeDownStationId,
    setValue: setDownStationId,
  } = useSelect(-1);

  const downStationList = stationList.filter((station) => station.id !== upStationId);

  const unableAddColors = lineList.map((line) => line.color);
  const unableEditColors = lineList
    .filter((line) => line.id !== editLineId)
    .map((line) => line.color);

  const handleChangeUpStationId: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedStationId = Number(event.target.value);
    setUpStationId(selectedStationId);

    if (downStationId !== selectedStationId) return;

    const [firstDownStationId] = downStationList.map((station) => station.id);

    setDownStationId(firstDownStationId);
  };

  const handleAddLine: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isSuccess = await requestAddLine({
      name,
      color,
      upStationId,
      downStationId,
      distance,
    });

    if (!isSuccess) return;

    closeAddModal();
    setName('');
    setDistance(-1);
  };

  const handleEditLine: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (editLineId < 0) return;

    const isSuccess = await requestEditLine({
      id: editLineId,
      name: editName,
      color: editColor,
    });

    if (!isSuccess) return;

    closeEditModal();
    setEditName('');
    setEditLineId(-1);
  };

  const handleDeleteLine = (id: Line['id']) => {
    requestDeleteLine(id);
  };

  const handleOpenAddModal = () => {
    if (stationList.length < LINE.MIN_QUANTITY_STATION_TO_ADD_LINE) {
      enqueueSnackbar(MESSAGE.ERROR.INVALID_STATION_LENGTH, {
        variant: 'warning',
      });
      return;
    }

    openAddModal();
  };

  const handleOpenEditModal = (editLine: Line) => {
    openEditModal();

    setEditLineId(editLine.id);
    setEditName(editLine.name);
    onChangeEditColor(editLine.color);
  };

  useEffect(() => {
    if (stationList.length > 1) {
      const [firstStationId, secondStationId] = stationList.map((station) => station.id);
      setUpStationId(firstStationId);
      setDownStationId(secondStationId);
    }
  }, [setDownStationId, setUpStationId, stationList]);

  return (
    <>
      <Styled.LinePage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 노선 관리</Styled.HeaderText>
              <Styled.Control>
                <Styled.Divider />
                <Styled.ButtonList>
                  <Button aria-label="노선 추가" shape="circle" onClick={handleOpenAddModal}>
                    <AddIcon />
                  </Button>
                </Styled.ButtonList>
              </Styled.Control>
              {lineStatus === ApiStatus.FULFILLED && lineList.length === 0 && (
                <MessageBox emoji="👻">노선 목록이 비어있습니다</MessageBox>
              )}
              {lineList.length > 0 && (
                <Styled.List>
                  {lineList.map((line) => (
                    <Styled.Item key={line.id}>
                      <Styled.NameWrapper>
                        <ColorDot color={line.color} />
                        <Styled.Name>{line.name}</Styled.Name>
                      </Styled.NameWrapper>
                      <Styled.OptionWrapper>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="노선 수정"
                          onClick={() => handleOpenEditModal(line)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="노선 삭제"
                          onClick={() => handleDeleteLine(line.id)}
                        >
                          <TrashIcon />
                        </Button>
                      </Styled.OptionWrapper>
                    </Styled.Item>
                  ))}
                </Styled.List>
              )}
            </Card>
          </Styled.FormContainer>
        </Styled.Container>
      </Styled.LinePage>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <Styled.ModalTitle>노선 생성</Styled.ModalTitle>
        <Styled.Form onSubmit={handleAddLine}>
          <Styled.InputWrapper>
            <Input
              value={name}
              onChange={onChangeName}
              labelText="노선 이름"
              placeholder="노선 이름"
              icon={<ColorDot color={color} />}
              autoFocus
              required
            />
          </Styled.InputWrapper>
          <Styled.SelectWrapper>
            <Select value={upStationId} onChange={handleChangeUpStationId} required>
              {stationList?.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </Select>
            <HorizontalArrowIcon />
            <Select value={downStationId} onChange={onChangeDownStationId} required>
              {downStationList?.map((station) => {
                return (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                );
              })}
            </Select>
          </Styled.SelectWrapper>
          <Styled.InputWrapper>
            <Input
              type="number"
              value={distance === -1 ? '' : distance}
              onChange={onChangeDistance}
              labelText="거리"
              placeholder="거리"
              min={1}
              required
            />
          </Styled.InputWrapper>
          <Styled.ColorPaletteWrapper>
            <ColorPalette onClick={onChangeColor} disabledColors={unableAddColors} />
          </Styled.ColorPaletteWrapper>
          <Styled.ButtonWrapper>
            <Button variant="text" type="button" onClick={closeAddModal}>
              취소
            </Button>
            <Button>추가</Button>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <Styled.ModalTitle>노선 수정</Styled.ModalTitle>
        <Styled.Form onSubmit={handleEditLine}>
          <Styled.InputWrapper>
            <Input
              value={editName}
              onChange={onChangeEditName}
              labelText="노선 이름"
              placeholder="노선 이름"
              icon={<ColorDot color={editColor} />}
              autoFocus
              minLength={LINE.NAME_MIN_LENGTH}
              maxLength={LINE.NAME_MAX_LENGTH}
              required
            />
          </Styled.InputWrapper>
          <Styled.ColorPaletteWrapper>
            <ColorPalette onClick={onChangeEditColor} disabledColors={unableEditColors} />
          </Styled.ColorPaletteWrapper>
          <Styled.ButtonWrapper>
            <Button variant="text" type="button" onClick={closeEditModal}>
              취소
            </Button>
            <Button>수정</Button>
          </Styled.ButtonWrapper>
        </Styled.Form>
      </Modal>
    </>
  );
};

export default LinePage;

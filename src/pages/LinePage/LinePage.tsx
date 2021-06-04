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

  const { add, edit, remove, list, status: lineStatus } = useLine();
  const { list: stationList } = useStation();

  const { color, onChange: onChangeColor } = useColorPalette();
  const { color: editColor, onChange: onChangeEditColor } = useColorPalette();

  const [editLineId, setEditLineId] = useState<Line['id']>(-1);

  const { value: name, setValue: setName, onChange: onChangeName } = useInput('');
  const { value: editName, setValue: setEditName, onChange: onChangeEditName } = useInput('');
  const {
    value: distanceValue,
    valueAsNumber: distance,
    setValue: setDistance,
    onChange: onChangeDistance,
  } = useInput('');
  const { valueAsNumber: upStationId, setValue: setUpStationId } = useSelect('');
  const {
    valueAsNumber: downStationId,
    onChange: onChangeDownStationId,
    setValue: setDownStationId,
  } = useSelect('');

  const downStationList = stationList.filter((station) => station.id !== upStationId);

  const unableAddColors = list.map((line) => line.color);
  const unableEditColors = list.filter((item) => item.id !== editLineId).map((item) => item.color);

  const handleChangeUpStationId: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const selectedStationId = event.target.value;
    setUpStationId(selectedStationId);

    if (downStationId !== Number(selectedStationId)) return;

    const [firstDownStationId] = downStationList.map((station) => station.id);

    setDownStationId(`${firstDownStationId}`);
  };

  const handleAddLine: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await add({
      name,
      color,
      upStationId,
      downStationId,
      distance,
    });

    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.LINE_ADDED, {
      variant: 'success',
    });
    closeAddModal();
    setName('');
    setDistance('');
  };

  const handleEditLine: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (editLineId < 0) return;

    const response = await edit({
      id: editLineId,
      name: editName,
      color: editColor,
    });

    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.LINE_EDITED);
    closeEditModal();
    setEditName('');
    setEditLineId(-1);
  };

  const handleDeleteLine = async (id: Line['id']) => {
    const response = await remove(id);
    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.LINE_DELETED);
  };

  const handleOpenAddModal = () => {
    if (stationList.length < 2) {
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
      setUpStationId(`${firstStationId}`);
      setDownStationId(`${secondStationId}`);
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
              {lineStatus === ApiStatus.FULFILLED && list.length === 0 && (
                <MessageBox emoji="👻">노선 목록이 비어있습니다</MessageBox>
              )}
              {list.length > 0 && (
                <Styled.List>
                  {list.map((item) => (
                    <Styled.Item key={item.id}>
                      <Styled.NameWrapper>
                        <ColorDot color={item.color} />
                        <Styled.Name>{item.name}</Styled.Name>
                      </Styled.NameWrapper>
                      <Styled.OptionWrapper>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="노선 수정"
                          onClick={() => handleOpenEditModal(item)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="노선 삭제"
                          onClick={() => handleDeleteLine(item.id)}
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
        <Modal.Title>노선 생성</Modal.Title>
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
              value={distanceValue}
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
          <Modal.Control>
            <Button variant="text" type="button" onClick={closeAddModal}>
              취소
            </Button>
            <Button>추가</Button>
          </Modal.Control>
        </Styled.Form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <Modal.Title>노선 수정</Modal.Title>
        <Styled.Form onSubmit={handleEditLine}>
          <Styled.InputWrapper>
            <Input
              value={editName}
              onChange={onChangeEditName}
              labelText="노선 이름"
              placeholder="노선 이름"
              icon={<ColorDot color={editColor} />}
              autoFocus
              minLength={2}
              maxLength={10}
              required
            />
          </Styled.InputWrapper>
          <Styled.ColorPaletteWrapper>
            <ColorPalette onClick={onChangeEditColor} disabledColors={unableEditColors} />
          </Styled.ColorPaletteWrapper>
          <Modal.Control>
            <Button variant="text" type="button" onClick={closeEditModal}>
              취소
            </Button>
            <Button>수정</Button>
          </Modal.Control>
        </Styled.Form>
      </Modal>
    </>
  );
};

export default LinePage;

import React, { FormEventHandler, useState } from 'react';
import { Button, Card, Input, Modal } from '../../components';
import * as Styled from './StationPage.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useStation from '../../hooks/useStation';
import { Station } from '../../types';
import MessageBox from '../../components/MessageBox/MessageBox';
import { STATION } from '../../constants/data';

const StationPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const { value: name, setValue: setName, onChange: onChangeName } = useInput('');
  const { value: editName, setValue: setEditName, onChange: onChangeEditName } = useInput('');
  const [editStationId, setEditStationId] = useState<Station['id']>(-1);

  const { stationList, requestAddStation, requestEditStation, requestDeleteStation, isLoading } =
    useStation();

  const handleAdd: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isSuccess = await requestAddStation(name);

    if (!isSuccess) return;

    setName('');
  };

  const handleOpenEditModal = (editStation: Station) => {
    openModal();

    setEditStationId(editStation.id);
    setEditName(editStation.name);
  };

  const handleEdit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!editStationId) return;

    const isSuccess = await requestEditStation({ id: editStationId, name: editName });

    if (!isSuccess) return;

    setEditStationId(-1);
    setEditName('');
    closeModal();
  };

  const handleDelete = (id: Station['id']) => {
    requestDeleteStation(id);
  };

  return (
    <>
      <Styled.StationPage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 역 관리</Styled.HeaderText>
              <Styled.AddForm onSubmit={handleAdd}>
                <Styled.InputWrapper>
                  <Input
                    labelText="지하철 역 이름을 입력해주세요"
                    icon={<SubwayIcon />}
                    minLength={STATION.NAME_MIN_LENGTH}
                    maxLength={STATION.NAME_MAX_LENGTH}
                    value={name}
                    onChange={onChangeName}
                    autoFocus
                  />
                </Styled.InputWrapper>
                <Button>추가</Button>
              </Styled.AddForm>
            </Card>
          </Styled.FormContainer>
          {!isLoading && stationList.length === 0 && (
            <MessageBox emoji="👻">역 목록이 비어있습니다</MessageBox>
          )}
          {stationList.length > 0 && (
            <Styled.ListContainer>
              <Card variant="simple">
                <Styled.List>
                  {stationList.map((station) => (
                    <Styled.Item key={station.id}>
                      <Styled.Name>{station.name}</Styled.Name>
                      <Styled.OptionWrapper>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="역 수정"
                          onClick={() => handleOpenEditModal(station)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="역 삭제"
                          onClick={() => handleDelete(station.id)}
                        >
                          <TrashIcon />
                        </Button>
                      </Styled.OptionWrapper>
                    </Styled.Item>
                  ))}
                </Styled.List>
              </Card>
            </Styled.ListContainer>
          )}
        </Styled.Container>
      </Styled.StationPage>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Styled.ModalTitle>역 이름 수정</Styled.ModalTitle>
        <Styled.EditForm onSubmit={handleEdit}>
          <Input
            labelText="역 이름"
            icon={<SubwayIcon />}
            placeholder="역 이름"
            minLength={STATION.NAME_MIN_LENGTH}
            maxLength={STATION.NAME_MAX_LENGTH}
            value={editName}
            onChange={onChangeEditName}
            autoFocus
          />
          <Styled.ButtonWrapper>
            <Button type="button" variant="text" onClick={closeModal}>
              취소
            </Button>
            <Button>수정</Button>
          </Styled.ButtonWrapper>
        </Styled.EditForm>
      </Modal>
    </>
  );
};

export default StationPage;

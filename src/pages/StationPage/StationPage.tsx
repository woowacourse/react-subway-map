import React, { FormEventHandler, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Card, Input, Modal } from '../../components';
import * as Styled from './StationPage.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';
import useModal from '../../hooks/useModal';
import useInput from '../../hooks/useInput';
import useStation from '../../hooks/useStation';
import { ApiStatus, Station } from '../../types';
import MESSAGE from '../../constants/message';
import MessageBox from '../../components/MessageBox/MessageBox';

const StationPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { value: name, setValue: setName, onChange: onChangeName } = useInput('');
  const { value: editName, setValue: setEditName, onChange: onChangeEditName } = useInput('');
  const [editStationId, setEditStationId] = useState<Station['id'] | null>(null);

  const { list, status, add, edit, remove } = useStation();

  const handleAdd: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const response = await add(name);
    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.STATION_ADDED, {
      variant: 'success',
    });
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

    const response = await edit({ id: editStationId, name: editName });
    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.STATION_EDITED);
    setEditStationId(null);
    setEditName('');
    closeModal();
  };

  const handleDelete = async (id: Station['id']) => {
    const response = await remove(id);
    if (response.meta.requestStatus === ApiStatus.REJECTED) return;

    enqueueSnackbar(MESSAGE.SUCCESS.STATION_DELETED);
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
                    minLength={2}
                    maxLength={20}
                    value={name}
                    onChange={onChangeName}
                    autoFocus
                  />
                </Styled.InputWrapper>
                <Button>추가</Button>
              </Styled.AddForm>
            </Card>
          </Styled.FormContainer>
          {status === ApiStatus.FULFILLED && list.length === 0 && (
            <MessageBox emoji="👻">역 목록이 비어있습니다</MessageBox>
          )}
          {list.length > 0 && (
            <Styled.ListContainer>
              <Card variant="simple">
                <Styled.List>
                  {list.map((item) => (
                    <Styled.Item key={item.id}>
                      <Styled.Name>{item.name}</Styled.Name>
                      <Styled.OptionWrapper>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="역 수정"
                          onClick={() => handleOpenEditModal(item)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          shape="circle"
                          variant="text"
                          aria-label="역 삭제"
                          onClick={() => handleDelete(item.id)}
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
            minLength={2}
            maxLength={20}
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

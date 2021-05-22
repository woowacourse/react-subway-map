import React from 'react';
import { Button, Card, Input } from '../../components';
import * as Styled from './StationPage.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';
import useModal from '../../hooks/useModal';

const StationPage = () => {
  const { Modal, openModal, closeModal } = useModal();

  return (
    <>
      <Styled.StationPage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 역 관리</Styled.HeaderText>
              <Styled.AddForm>
                <Styled.InputWrapper>
                  <Input
                    labelText="지하철 역 이름을 입력해주세요"
                    icon={<SubwayIcon />}
                    autoFocus
                  />
                </Styled.InputWrapper>
                <Button>추가</Button>
              </Styled.AddForm>
            </Card>
          </Styled.FormContainer>
          <Styled.ListContainer>
            <Card variant="simple">
              <Styled.List>
                <Styled.Item>
                  <Styled.Name>강남역</Styled.Name>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text" onClick={openModal}>
                      <EditIcon />
                    </Button>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
                <Styled.Item>
                  <Styled.Name>언주역</Styled.Name>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text" onClick={openModal}>
                      <EditIcon />
                    </Button>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
              </Styled.List>
            </Card>
          </Styled.ListContainer>
        </Styled.Container>
      </Styled.StationPage>

      <Modal>
        <Styled.ModalTitle>역 이름 수정</Styled.ModalTitle>
        <Styled.EditForm>
          <Input labelText="역 이름" icon={<SubwayIcon />} placeholder="역 이름" />
          <Styled.ButtonWrapper>
            <Button type="button" variant="text" onClick={closeModal}>
              취소
            </Button>
            <Button>추가</Button>
          </Styled.ButtonWrapper>
        </Styled.EditForm>
      </Modal>
    </>
  );
};

export default StationPage;

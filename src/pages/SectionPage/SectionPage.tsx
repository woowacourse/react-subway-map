import React from 'react';
import { Button, Card, Input, Select, ColorDot, Modal } from '../../components';
import { Color } from '../../types';
import * as Styled from './SectionPage.styles';
import { ReactComponent as AddIcon } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as HorizontalArrowIcon } from '../../assets/icons/arrows-alt-h-solid.svg';
import useModal from '../../hooks/useModal';

const SectionPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Styled.SectionPage>
        <Styled.Container>
          <Styled.FormContainer>
            <Card>
              <Styled.HeaderText>지하철 구간 관리</Styled.HeaderText>
              <Select labelText="노선 선택">
                <option value="1">1호선</option>
                <option value="2">2호선</option>
              </Select>
              <Styled.Control>
                <Styled.Divider />
                <Styled.ButtonList>
                  <Button shape="circle" onClick={openModal}>
                    <AddIcon />
                  </Button>
                </Styled.ButtonList>
              </Styled.Control>
              <Styled.LineHeader>
                <ColorDot color={Color.RED_500} />
                <Styled.LineName>1호선</Styled.LineName>
              </Styled.LineHeader>
              <Styled.List>
                <Styled.Item>
                  <Styled.StationName>강남역</Styled.StationName>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
                <Styled.Item>
                  <Styled.StationName>언주역</Styled.StationName>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
              </Styled.List>
            </Card>
          </Styled.FormContainer>
        </Styled.Container>
      </Styled.SectionPage>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Styled.ModalTitle>구간 생성</Styled.ModalTitle>
        <Styled.Form>
          <Styled.SelectWrapper>
            <Select labelText="노선 선택">
              <option value="1">1호선</option>
              <option value="2">2호선</option>
            </Select>
          </Styled.SelectWrapper>
          <Styled.SelectWrapper>
            <Select labelText="상행역">
              <option value="1">강남역</option>
              <option value="2">언주역</option>
              <option value="3">잠실역</option>
            </Select>
            <HorizontalArrowIcon />
            <Select labelText="하행역">
              <option value="1">강남역</option>
              <option value="2">언주역</option>
              <option value="3">잠실역</option>
            </Select>
          </Styled.SelectWrapper>
          <Styled.InputWrapper>
            <Input labelText="거리" placeholder="거리" />
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

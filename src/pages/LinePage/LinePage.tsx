import React from 'react';
import { Button, Card, ColorDot, Input, Select, ColorPalette } from '../../components';
import { Color } from '../../types';
import * as Styled from './LinePage.styles';
import { ReactComponent as AddIcon } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';
import { ReactComponent as HorizontalArrowIcon } from '../../assets/icons/arrows-alt-h-solid.svg';
import useModal from '../../hooks/useModal';

const LinePage = () => {
  const { Modal, openModal, closeModal } = useModal();

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
                  <Button shape="circle" onClick={openModal}>
                    <AddIcon />
                  </Button>
                </Styled.ButtonList>
              </Styled.Control>
              <Styled.List>
                <Styled.Item>
                  <Styled.NameWrapper>
                    <ColorDot color={Color.RED_500} />
                    <Styled.Name>1호선</Styled.Name>
                  </Styled.NameWrapper>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text">
                      <EditIcon />
                    </Button>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
                <Styled.Item>
                  <Styled.NameWrapper>
                    <ColorDot color={Color.GREEN_400} />
                    <Styled.Name>2호선</Styled.Name>
                  </Styled.NameWrapper>
                  <Styled.OptionWrapper>
                    <Button shape="circle" variant="text">
                      <EditIcon />
                    </Button>
                    <Button shape="circle" variant="text">
                      <TrashIcon />
                    </Button>
                  </Styled.OptionWrapper>
                </Styled.Item>
              </Styled.List>
            </Card>
          </Styled.FormContainer>
        </Styled.Container>
      </Styled.LinePage>

      <Modal>
        <Styled.ModalTitle>노선 생성</Styled.ModalTitle>
        <Styled.Form>
          <Styled.InputWrapper>
            <Input
              labelText="노선 이름"
              placeholder="노선 이름"
              icon={<ColorDot color={Color.RED_500} />}
              autoFocus
            />
          </Styled.InputWrapper>
          <Styled.SelectWrapper>
            <Select>
              <option value="1">강남역</option>
              <option value="2">언주역</option>
              <option value="3">잠실역</option>
            </Select>
            <HorizontalArrowIcon />
            <Select>
              <option value="1">강남역</option>
              <option value="2">언주역</option>
              <option value="3">잠실역</option>
            </Select>
          </Styled.SelectWrapper>
          <Styled.InputWrapper>
            <Input labelText="거리" placeholder="거리" />
          </Styled.InputWrapper>
          <Styled.ColorPaletteWrapper>
            <ColorPalette />
          </Styled.ColorPaletteWrapper>
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

export default LinePage;

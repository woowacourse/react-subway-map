import React from 'react';
import { Button, Card, Input } from '../../components';
import * as Styled from './StationPage.styles';
import { ReactComponent as SubwayIcon } from '../../assets/icons/subway-solid.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-solid.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-solid.svg';

const StationPage = () => {
  return (
    <Styled.StationPage>
      <Styled.Container>
        <Styled.FormContainer>
          <Card>
            <Styled.HeaderText>지하철 역 관리</Styled.HeaderText>
            <Styled.Form>
              <Styled.InputWrapper>
                <Input labelText="지하철 역 이름을 입력해주세요" icon={<SubwayIcon />} autoFocus />
              </Styled.InputWrapper>
              <Button>추가</Button>
            </Styled.Form>
          </Card>
        </Styled.FormContainer>
        <Styled.ListContainer>
          <Card variant="simple">
            <Styled.StationList>
              <Styled.StationItem>
                <Styled.StationName>강남역</Styled.StationName>
                <Styled.StationOptionWrapper>
                  <Button shape="circle" variant="text">
                    <EditIcon />
                  </Button>
                  <Button shape="circle" variant="text">
                    <TrashIcon />
                  </Button>
                </Styled.StationOptionWrapper>
              </Styled.StationItem>
              <Styled.StationItem>
                <Styled.StationName>언주역</Styled.StationName>
                <Styled.StationOptionWrapper>
                  <Button shape="circle" variant="text">
                    <EditIcon />
                  </Button>
                  <Button shape="circle" variant="text">
                    <TrashIcon />
                  </Button>
                </Styled.StationOptionWrapper>
              </Styled.StationItem>
            </Styled.StationList>
          </Card>
        </Styled.ListContainer>
      </Styled.Container>
    </Styled.StationPage>
  );
};

export default StationPage;

import React from 'react';
import {
  Button,
  ModalTemplate,
  Input,
  Selector,
  ColorPicker,
} from '../../../components';
import { COLOR, SIZE } from '../../../constants';
import { ButtonWrapper, Form, SelectorWrapper } from './style';

const LineAddModal = ({ onClickToClose }) => (
  <ModalTemplate title={'노선 생성'} onClickToClose={onClickToClose}>
    <Form>
      <Input
        type="text"
        name="line-name"
        label="노선 이름"
        placeholder="노선 이름"
        size={SIZE.LG}
      />
      <SelectorWrapper>
        <Selector
          name="line-upStation"
          defaultOption="상행 종점"
          options={[]}
          size={SIZE.LG}
        />
        <span>↔️</span>
        <Selector
          name="line-downStation"
          defaultOption="하행 종점"
          options={[]}
          size={SIZE.LG}
        />
      </SelectorWrapper>
      <Input
        type="text"
        name="line-distance"
        label="거리"
        placeholder="거리"
        size={SIZE.LG}
      />
      <ColorPicker pickedColor={'test'} onClickColor={() => {}} />
      <ButtonWrapper>
        <Button backgroundColor={COLOR.AMBER}>확인</Button>
      </ButtonWrapper>
    </Form>
  </ModalTemplate>
);

export default LineAddModal;

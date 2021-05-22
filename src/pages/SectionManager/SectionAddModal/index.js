import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalTemplate, Input, Selector } from '../../../components';
import { COLOR, SIZE } from '../../../constants';
import { ButtonWrapper, Form, LineName, SelectorWrapper } from './style';

const SectionAddModal = ({ line, onClickToClose }) => (
  <ModalTemplate title={'구간 추가'} onClickToClose={onClickToClose}>
    <LineName color={line.color}>{line.name}</LineName>
    <Form>
      <SelectorWrapper>
        <Selector
          name="section-upStation"
          label="상행역"
          defaultOption="상행역"
          options={[]}
          size={SIZE.LG}
        />
        <span>↔️</span>
        <Selector
          name="section-downStation"
          label="하행역"
          defaultOption="하행역"
          options={[]}
          size={SIZE.LG}
        />
      </SelectorWrapper>
      <Input
        type="text"
        name="section-distance"
        label="거리"
        placeholder="거리"
        size={SIZE.LG}
      />
      <ButtonWrapper>
        <Button backgroundColor={COLOR.AMBER}>확인</Button>
      </ButtonWrapper>
    </Form>
  </ModalTemplate>
);

SectionAddModal.propType = {
  line: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    sections: PropTypes.array,
  }).isRequired,
  onClickToClose: PropTypes.func.isRequired,
};

export default SectionAddModal;

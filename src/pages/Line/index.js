import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getLines, addLine, clearAddSuccess, removeLine } from '../../redux/lineSlice';

import { ButtonSquare, IconPlus, Input, Modal, Section, Select, ColorPicker, IconArrowLTR } from '../../components';
import { LineListItem } from './LineListItem';
import { Form, List, AddButton, CancelButton, StationSelect, ButtonControl } from './style';
import { COLOR } from '../../constants';

export const LinePage = (props) => {
  const { endpoint } = props;

  const dispatch = useDispatch();
  const { stations } = useSelector((store) => store.station);
  const { lines, isAddSuccess } = useSelector((store) => store.line);
  const [isLineAddOpen, setIsLineAddOpen] = useState(false);

  const handleOpenModal = () => {
    setIsLineAddOpen(true);
  };

  const handleCloseModal = () => setIsLineAddOpen(false);

  const handleAddLine = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const upStation = e.target.upStation.value;
    const downStation = e.target.downStation.value;
    const distance = e.target.distance.value;
    const color = e.target.color.value;

    dispatch(addLine({ endpoint, name, upStation, downStation, distance, color }));
  };

  const handleDeleteLine = (e, lineId) => {
    dispatch(removeLine({ endpoint, id: lineId }));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    dispatch(getLines({ endpoint }));
  }, []);

  useEffect(() => {
    if (isAddSuccess) {
      dispatch(clearAddSuccess());
    }
  }, [isAddSuccess]);

  return (
    <Section heading="노선 관리">
      <AddButton onClick={handleOpenModal}>
        <IconPlus width={30} color={COLOR.TEXT.DEFAULT} />
      </AddButton>
      <List>
        {lines?.map((line) => (
          <LineListItem key={line.id} line={line} onClick={handleDeleteLine} />
        ))}
      </List>
      {isLineAddOpen && (
        <Modal>
          <Section heading="노선 추가">
            <Form onSubmit={handleAddLine}>
              {/* eslint-disable jsx-a11y/no-autofocus */}
              <Input type="text" name="name" placeholder="노선 이름" autoFocus required />
              <StationSelect>
                <Select id="upStation" name="upStation" optionHead="상행역" options={stations}></Select>
                <IconArrowLTR />
                <Select id="downStation" name="downStation" optionHead="하행역" options={stations}></Select>
              </StationSelect>
              <Input type="number" name="distance" placeholder="거리(km)" required />
              <ColorPicker label="노선선택" colors={Object.values(COLOR.LINE)} />
            </Form>
            <ButtonControl>
              <CancelButton onClick={handleCloseModal}>취소</CancelButton>
              <ButtonSquare>확인</ButtonSquare>
            </ButtonControl>
          </Section>
        </Modal>
      )}
    </Section>
  );
};

LinePage.propTypes = {
  endpoint: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { LINE_COLORS } from '../../constants/appInfo';
import { DUMMY_STATIONS } from '../../constants/dummies';
import Button from '../@common/Button/Button';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import SectionSelectBox from '../@shared/SectionSelectBox/SectionSelectBox';
import { LineColorContainer, LineForm, LineModalButtonContainer } from './LinesModal.styles';

interface Props {
  onClose: () => void;
  lineName: string;
}

const LinesModal: FC<Props> = ({ onClose, lineName }) => {
  return (
    <Modal titleText="노선 추가" onClose={onClose}>
      <LineForm>
        <Input labelText="노선 이름" placeholder="노선 이름" value={lineName} disabled={true} />
        <SectionSelectBox upStations={DUMMY_STATIONS} downStations={DUMMY_STATIONS} />
        <Input type="number" min={1} labelText="거리" />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>노선색상</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              radioColor={color as string}
              groupName="lineColor"
              isChecked={false}
              onChange={() => {
                console.log('checked!');
              }}
            />
          ))}
        </LineColorContainer>
        <LineModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false}>
            취소
          </Button>
          <Button>확인</Button>
        </LineModalButtonContainer>
      </LineForm>
    </Modal>
  );
};

LinesModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  lineName: PropTypes.string.isRequired,
};

export default LinesModal;

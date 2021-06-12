import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import React from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Palette from '@units/Palette/Palette';
import Button from '@shared/Button/Button';
import ImageButton from '@shared/ImageButton/ImageButton';
import { StationInterface } from 'types';
import { AddLinePayload } from 'redux/lineSlice';
import COLORS from 'constants/color';
import InputContainer from '@units/InputContainer/InputContainer';
import useSelect from 'hooks/useSelect';
import useInput from 'hooks/useInput';

interface AddLineModalProps {
  onSubmit: ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => void;
  onModalClose: () => void;
  stations: StationInterface[] | null;
}

const AddLineModal = ({ onModalClose, onSubmit, stations }: AddLineModalProps) => {
  const { value: name, onChange: onNameChange } = useInput();
  const { value: upStationId, onChange: onUpStationIdChange } = useSelect();
  const { value: downStationId, onChange: onDownStationIdChange } = useSelect();
  const { value: distance, onChange: onDistanceChange } = useInput();
  const { value: color, setValue: setColor } = useInput();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit({
        name,
        color,
        upStationId,
        downStationId,
        distance,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20">
      <Container className="w-1/2 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end -mb-4">
            <ImageButton
              bgColor="bg-gray-100"
              hoverBgColor="bg-gray-200"
              imgSize="w-4"
              imgUrl={closeImg}
              size="w-8 h-8"
              onClick={onModalClose}
            />
          </div>
          <Title className="mb-8 text-center" text="🛤️ 노선 생성" />
          <InputContainer className="mb-8 w-full">
            <Input placeholder="노선 이름을 입력해주세요" title="노선 이름" value={name} onChange={onNameChange} />
          </InputContainer>
          <div className="flex items-center mb-8">
            <SelectInput
              className="w-full"
              data={stations}
              defaultSelect="역을 선택해주세요"
              defaultValue="DEFAULT"
              title="상행역"
              onChange={onUpStationIdChange}
            />
            <img alt="arrowImg" className="mx-2 w-8 h-8" src={arrowImg} />
            <SelectInput
              className="w-full"
              data={stations}
              defaultSelect="역을 선택해주세요"
              defaultValue="DEFAULT"
              title="하행역"
              onChange={onDownStationIdChange}
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <InputContainer className="w-10/12">
              <Input
                placeholder="거리를 입력해주세요"
                title="거리"
                type="number"
                value={Number.isNaN(distance) ? '' : distance}
                onChange={onDistanceChange}
              />
            </InputContainer>
            <div className={`w-1/12 h-12 rounded ring-1 ring-gray-500 ${color} ${COLORS[color]?.ringColor}`} />
          </div>
          <Palette setColor={setColor} />
          <div className="flex justify-end mt-8">
            <Button text="확인" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddLineModal;

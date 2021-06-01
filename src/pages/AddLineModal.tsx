import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import React, { useState } from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Palette from '@units/Palette/Palette';
import Button from '@shared/Button/Button';
import ImageButton from '@shared/ImageButton/ImageButton';
import { StationInterface } from 'types';
import { AddLinePayload } from 'redux/lineSlice';
import { ringColor } from 'constants/color';

interface AddLineModalProps {
  onSubmit: ({ name, color, upStationId, downStationId, distance }: AddLinePayload) => void;
  onModalClose: () => void;
  stations: StationInterface[] | null;
}

const AddLineModal = ({ onModalClose, onSubmit, stations }: AddLineModalProps) => {
  const [name, setName] = useState('');
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, setDistance] = useState(0);
  const [color, setColor] = useState('');

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleUpStationId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUpStationId(event.target.value);
  };
  const handleDownStationId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDownStationId(event.target.value);
  };

  const handleDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.valueAsNumber);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit({ name, color, upStationId: Number(upStationId), downStationId: Number(downStationId), distance });
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
          <Input
            className="mb-8 w-full"
            placeholder="노선 이름을 입력해주세요"
            title="노선 이름"
            value={name}
            onChange={handleName}
          />
          <div className="flex items-center mb-8">
            <SelectInput
              className="w-full"
              data={stations}
              defaultSelect="역을 선택해주세요"
              defaultValue="DEFAULT"
              title="상행역"
              onChange={handleUpStationId}
            />
            <img alt="arrowImg" className="mx-2 w-8 h-8" src={arrowImg} />
            <SelectInput
              className="w-full"
              data={stations}
              defaultSelect="역을 선택해주세요"
              defaultValue="DEFAULT"
              title="하행역"
              onChange={handleDownStationId}
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <Input
              className="w-10/12"
              placeholder="거리를 입력해주세요"
              title="거리"
              type="number"
              value={Number.isNaN(distance) ? '' : distance}
              onChange={handleDistance}
            />
            <div className={`w-1/12 h-12 rounded ring-1 ring-gray-500 ${color} ${ringColor[color]}`} />
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

import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import React from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Button from '@shared/Button/Button';
import ImageButton from '@shared/ImageButton/ImageButton';
import { LineInterface, StationInterface } from 'types';
import { AddSectionPayload } from 'redux/sectionSlice';
import useChangeEvent from 'hooks/useChangeEvent';

interface AddSectionModalProps {
  onModalClose: () => void;
  onSubmit: ({ id, upStationId, downStationId, distance }: AddSectionPayload) => void;
  stations: StationInterface[] | null;
  lines: LineInterface[] | null;
}

const AddSectionModal = ({ onModalClose, onSubmit, stations, lines }: AddSectionModalProps) => {
  const { value: lineId, onChange: onLineIdChange } = useChangeEvent(0);
  const { value: upStationId, onChange: onUpStationIdChange } = useChangeEvent(0);
  const { value: downStationId, onChange: onDownStationIdChange } = useChangeEvent(0);
  const { value: distance, onChange: onDistanceChange } = useChangeEvent(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit({
        id: lineId,
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
        <Title className="mb-8 text-center" text="🔁  구간 추가" />
        <form onSubmit={handleSubmit}>
          <SelectInput
            className="mb-8 w-full"
            data={lines}
            defaultSelect="노선을 선택해주세요"
            defaultValue="DEFAULT"
            title="노선 이름"
            onChange={onLineIdChange}
          />
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
          <Input
            className="mb-8 w-full"
            placeholder="거리를 입력해주세요"
            title="거리"
            type="number"
            value={Number.isNaN(distance) ? '' : distance}
            onChange={onDistanceChange}
          />
          <div className="flex justify-end">
            <Button text="확인" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddSectionModal;

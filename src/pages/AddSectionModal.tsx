import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import Title from '@shared/Title/Title';
import React, { useState } from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Button from '@shared/Button/Button';
import { LineInterface, StationInterface } from 'types';
import { AddSectionPayload } from 'redux/sectionSlice';
import ItemSelector from '@units/ItemSelector/ItemSelector';

interface AddSectionModalProps {
  onModalClose: () => void;
  onSubmit: ({ id, upStationId, downStationId, distance }: AddSectionPayload) => void;
  stations: StationInterface[] | null;
  lines: LineInterface[] | null;
}

const AddSectionModal = ({ onModalClose, onSubmit, stations, lines }: AddSectionModalProps) => {
  const [lineId, setLineId] = useState('');
  const [upStationId, setUpStationId] = useState('');
  const [downStationId, setDownStationId] = useState('');
  const [distance, setDistance] = useState(0);

  const handleDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(event.target.valueAsNumber);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onSubmit({
        id: Number(lineId),
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLineId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLineId(event.target.value);
  };
  const handleUpStationId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUpStationId(event.target.value);
  };
  const handleDownStationId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDownStationId(event.target.value);
  };

  return (
    <div className="fixed left-0 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20">
      <Container className="w-1/2 bg-white">
        <div className="flex justify-end -mb-4">
          <Button
            onClick={onModalClose}
            size="w-8 h-8"
            bgColor="bg-gray-100"
            hoverBgColor="bg-gray-200"
            className="flex justify-center items-center shadow-md rounded-full"
          >
            <img className="opacity-70 w-4" src={closeImg} />
          </Button>
        </div>
        <Title text="🔁  구간 추가" className="mb-8 text-center" />
        <form onSubmit={handleSubmit}>
          <ItemSelector items={lines} defaultOption="노선을 선택해주세요." onChange={handleLineId} />
          <div className="flex items-center mb-8">
            <ItemSelector items={stations} defaultOption="역을 선택해주세요." onChange={handleUpStationId} />
            <img className="mx-2 w-8 h-8" src={arrowImg} alt="arrowImg" />
            <ItemSelector items={stations} defaultOption="역을 선택해주세요." onChange={handleDownStationId} />
          </div>
          <Input
            value={distance}
            onChange={handleDistance}
            type="number"
            title="거리"
            placeholder="거리를 입력해주세요"
            className="mb-8 w-full"
          />
          <div className="flex justify-end">
            <Button>
              <span>확인</span>
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddSectionModal;

import Container from '@shared/Container/Container';
import Input from '@shared/Input/Input';
import SelectInput from '@shared/SelectInput/SelectInput';
import Title from '@shared/Title/Title';
import React, { useState } from 'react';
import arrowImg from 'assets/images/arrow.png';
import closeImg from 'assets/images/close.png';
import Button from '@shared/Button/Button';
import ImageButton from '@shared/ImageButton/ImageButton';
import { LineInterface, StationInterface } from 'types';
import { AddSectionPayload } from 'redux/sectionSlice';

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
          <SelectInput className="mb-8 w-full" defaultValue="DEFAULT" title="노선 이름" onChange={handleLineId}>
            <option disabled hidden value="DEFAULT">
              노선을 선택해주세요
            </option>
            {lines?.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </SelectInput>
          <div className="flex items-center mb-8">
            <SelectInput className="w-full" defaultValue="DEFAULT" title="상행역" onChange={handleUpStationId}>
              {/* TODO: option 부분을 컴포넌트로 분리해야 할까? 말까? */}
              <option disabled hidden value="DEFAULT">
                역을 선택해주세요
              </option>
              {stations?.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </SelectInput>
            <img alt="arrowImg" className="mx-2 w-8 h-8" src={arrowImg} />
            <SelectInput className="w-full" defaultValue="DEFAULT" title="하행역" onChange={handleDownStationId}>
              <option disabled hidden value="DEFAULT">
                역을 선택해주세요
              </option>
              {stations?.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </SelectInput>
          </div>
          <Input
            className="mb-8 w-full"
            placeholder="거리를 입력해주세요"
            title="거리"
            type="number"
            value={Number.isNaN(distance) ? '' : distance}
            onChange={handleDistance}
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

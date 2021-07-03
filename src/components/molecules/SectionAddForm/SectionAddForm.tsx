import React from 'react';
import { ILineRes, IStationRes } from '../../../type';
import { Button, ContextSelect, Input, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { StyledForm, Wrapper } from './SectionAddForm.styles';

export interface SectionAddFormProps {
  stationList: IStationRes[];
  lineList: ILineRes[];
  onChangeLine: React.ChangeEventHandler<HTMLSelectElement>;
  lineId: number;
  closeModal: () => void;
}

const SectionAddForm = ({
  stationList,
  lineList,
  onChangeLine,
  lineId,
  closeModal,
}: SectionAddFormProps) => {
  const { state, submitFunc } = useFormContext();
  const lineOptions: IOption[] = lineList.map(({ id, name }) => ({
    value: id,
    name,
  }));

  const stationOptions: IOption[] =
    stationList.map(({ id, name }) => ({
      value: id,
      name,
    })) || [];

  const stationOptionsWithSelectedLine: IOption[] =
    lineList
      .find(line => line.id === lineId)
      ?.stations.map(station => ({
        value: station.id,
        name: station.name,
      })) || [];

  const onAddSection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(state.upStation && state.downStation && state.distance)) {
      window.alert('모든 항목을 입력해주세요');
      return;
    }

    const { upStation, downStation, distance } = state;

    if (upStation.value === downStation.value) {
      window.alert('상행선, 하행선은 달라야 합니다');
      return;
    }

    const body = {
      upStationId: Number(upStation.value),
      downStationId: Number(downStation.value),
      distance: Number(distance.value),
    };

    submitFunc(body, `${lineId}/sections`);
    closeModal();
  };

  return (
    <StyledForm onSubmit={onAddSection}>
      <Select
        defaultName="구간을 추가할 노선을 선택해주세요"
        options={lineOptions}
        onChange={onChangeLine}
      />
      <Wrapper>
        <ContextSelect
          name="upStation"
          defaultName="출발역"
          options={stationOptionsWithSelectedLine}
        />
        <ContextSelect name="downStation" defaultName="다음역" options={stationOptions} />
      </Wrapper>
      <Input name="distance" type="number" min={1} max={100} placeholder="거리 (km)" required />

      <Button>확인</Button>
    </StyledForm>
  );
};

export default SectionAddForm;

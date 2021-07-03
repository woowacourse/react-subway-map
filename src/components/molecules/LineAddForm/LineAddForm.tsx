/** @jsxImportSource @emotion/react */
import { StyledForm, Wrapper } from './LineAddForm.styles';
import { Button, ContextSelect, Input } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { IStationRes } from '../../../type.d';
import { COLOR } from '../../../constants';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { css } from '@emotion/react';
import { isValidLineName } from '../../../utils';
import ColorSelector from '../ColorSelector/ColorSelector';

export interface LineAddFormProps {
  stations: IStationRes[];
  closeModal: () => void;
}

const LineAddForm = ({ stations, closeModal }: LineAddFormProps) => {
  const stationListOptions: IOption[] = stations.map(({ id, name }) => ({
    value: id,
    name,
  }));

  const { state, submitFunc } = useFormContext();
  const currentColor = state?.color?.value;

  const onAddLine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !(state.lineName && state.color && state.upStation && state.downStation && state.lineDistance)
    ) {
      window.alert('모든 항목을 입력해주세요');
      return;
    }

    const { lineName, color, lineDistance, upStation, downStation } = state;

    if (!isValidLineName(lineName.value)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 20자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      return;
    }

    if (upStation.value === downStation.value) {
      window.alert('상행선, 하행선은 달라야 합니다');

      return;
    }

    const body = {
      name: lineName.value,
      color: color.value,
      distance: Number(lineDistance.value),
      upStationId: Number(upStation.value),
      downStationId: Number(downStation.value),
    };

    submitFunc(body);
    closeModal();
  };

  return (
    <StyledForm onSubmit={onAddLine}>
      <Input
        name="lineName"
        placeholder="노선 이름"
        minLength={2}
        maxLength={10}
        required
        css={css`
          border: 4px solid ${currentColor};
        `}
      />
      <Wrapper>
        <ContextSelect
          name="upStation"
          defaultName="상행선"
          options={stationListOptions}
          required
        />
        <ContextSelect
          name="downStation"
          defaultName="하행선"
          options={stationListOptions}
          required
        />
      </Wrapper>
      <Input name="lineDistance" type="number" placeholder="거리 (km)" min={1} max={100} required />
      <ColorSelector colorList={Object.values(COLOR.LineColor)} />
      <Button>확인</Button>
    </StyledForm>
  );
};

export default LineAddForm;

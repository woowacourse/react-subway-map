/** @jsxImportSource @emotion/react */
import ColorSelector from '../ColorSelector/ColorSelector';
import { StyledForm } from './LineEditForm.styles';
import { Button, Input } from '../../atoms';
import { COLOR } from '../../../constants';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { css } from '@emotion/react';
import { isValidLineName } from '../../../utils';
export interface LineEditFormProps {
  closeModal: () => void;
  selectedLineId: number | undefined;
}

const LineEditForm = ({ closeModal, selectedLineId }: LineEditFormProps) => {
  const { state, submitFunc } = useFormContext();
  const currentColor = state?.color?.value;

  const onEditLine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(state.lineName && state.color)) {
      window.alert('모든 항목을 입력해주세요');
      return;
    }

    const { lineName, color } = state;

    if (!isValidLineName(lineName.value)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 20자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      return;
    }

    const body = {
      name: lineName.value,
      color: color.value,
    };

    submitFunc(body, selectedLineId);
    closeModal();
  };

  return (
    <StyledForm onSubmit={onEditLine}>
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
      <ColorSelector colorList={Object.values(COLOR.LineColor)} />
      <Button>확인</Button>
    </StyledForm>
  );
};

export default LineEditForm;

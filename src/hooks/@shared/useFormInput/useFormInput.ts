import { useContext, useEffect, useState } from 'react';
import {
  CAN_SUBMIT_DEFAULT_VALUE,
  FormContext,
  InputInfo,
} from '../../../components/@common/Form/Form';

export const useFormInput = <T extends unknown>(
  initialInputValue: T,
  canSubmit?: boolean
): [
  {
    data: T;
    canSubmit: boolean;
  },
  (inputInfo: Partial<InputInfo<T>>) => void
] => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw Error('FormContext 내부에서만 useFormInfo를 사용할 수 있습니다.');
  }

  const { formInfo, setFormInfo, pushNewInputInfo } = formContext;

  const dummyInputInfo = {
    data: initialInputValue,
    canSubmit: CAN_SUBMIT_DEFAULT_VALUE,
  };

  const [inputId, setInputId] = useState(-1);

  useEffect(() => {
    const { id } = pushNewInputInfo(initialInputValue, canSubmit);
    setInputId(id);
  }, []);

  const inputInfo = formInfo[inputId] as InputInfo<T>;

  return [inputInfo || dummyInputInfo, setFormInfo.bind(null, inputId)];
};

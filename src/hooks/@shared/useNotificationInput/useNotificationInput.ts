import React, { ChangeEventHandler, useState } from 'react';
import { BaseInputElement, SetText } from '../../../types';
import useUpdateEffect from '../useUpdateEffect/useUpdateEffect';

interface OnChangeTool {
  setInput: SetText;
  setErrorMessage: SetText;
  targetValue: string;
}

type CustomOnChange = (onChangeTool: OnChangeTool) => void;

const useNotificationInput = <T extends BaseInputElement = HTMLInputElement>(
  customOnChange: CustomOnChange,
  onChangeAdditionalDependencyList?: React.DependencyList | undefined
): [string, string, ChangeEventHandler<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChange: ChangeEventHandler<T> = ({ target }) => {
    const onChangeTool = {
      setInput,
      setErrorMessage,
      targetValue: target.value,
    };

    const boundOnChange = customOnChange.bind(null, onChangeTool);
    boundOnChange();
  };

  useUpdateEffect(() => {
    if (!onChangeAdditionalDependencyList) {
      return;
    }

    const onChangeTool = {
      setInput,
      setErrorMessage,
      targetValue: input,
    };

    customOnChange(onChangeTool);
  }, onChangeAdditionalDependencyList);

  return [input, errorMessage, onChange, setInput];
};

export default useNotificationInput;

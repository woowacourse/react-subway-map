import React, { ChangeEventHandler, useEffect, useState } from 'react';

type SetMessage = (message: string) => void;

interface OnChangeTool {
  setInput: SetMessage;
  setErrorMessage: SetMessage;
  targetValue: string;
}

type CustomOnChange = (onChangeTool: OnChangeTool) => void;

type UseNotificationInput = (
  customOnChange: CustomOnChange,
  onChangeAdditionalDependencyList?: React.DependencyList | undefined
) => [string, string, ChangeEventHandler<HTMLInputElement>];

const useNotificationInput: UseNotificationInput = (
  customOnChange,
  onChangeAdditionalDependencyList
) => {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    const onChangeTool = {
      setInput,
      setErrorMessage,
      targetValue: value,
    };

    const boundOnChange = customOnChange.bind(null, onChangeTool);
    boundOnChange();
  };

  useEffect(() => {
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

  return [input, errorMessage, onChange];
};

export default useNotificationInput;

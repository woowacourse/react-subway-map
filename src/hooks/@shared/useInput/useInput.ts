import { ChangeEventHandler, useState } from 'react';
import { BaseInputElement, SetText } from '../../../types';

interface OnChangeTool {
  setInput: SetText;
  targetValue: string;
}

type CustomOnChange = (onChangeTool: OnChangeTool) => void;

const useInput = <T extends BaseInputElement = HTMLInputElement>(
  customOnChange: CustomOnChange
): [string, ChangeEventHandler<T>, React.Dispatch<React.SetStateAction<string>>] => {
  const [input, setInput] = useState('');

  const onChange: ChangeEventHandler<T> = ({ target }) => {
    const onChangeTool = {
      setInput,
      targetValue: target.value,
    };

    const boundOnChange = customOnChange.bind(null, onChangeTool);
    boundOnChange();
  };

  return [input, onChange, setInput];
};

export default useInput;

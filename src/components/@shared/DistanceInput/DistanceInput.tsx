import React, { ChangeEventHandler, VFC } from 'react';
import { LABEL_TEXT } from '../../../constants/a11y';
import { MIN_DISTANCE } from '../../../constants/appInfo';
import { useFormInput } from '../../../hooks/@shared/useFormInput/useFormInput';
import Input from '../../@common/Input/Input';

const DistanceInput: VFC = () => {
  const [distanceInfo, setDistanceInfo] = useFormInput(MIN_DISTANCE, true);

  const onChangeDistance: ChangeEventHandler<HTMLInputElement> = (event) => {
    const distance = event.currentTarget.valueAsNumber;

    setDistanceInfo({
      data: distance,
      canSubmit: true,
    });
  };

  return (
    <Input
      value={String(distanceInfo.data)}
      onChange={onChangeDistance}
      type="number"
      min={MIN_DISTANCE}
      labelText={LABEL_TEXT.DISTANCE}
      required
    />
  );
};

export default DistanceInput;

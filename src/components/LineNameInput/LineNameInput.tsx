import React, { ChangeEventHandler, useState, VFC } from 'react';
import { ERROR_MESSAGE } from '../../constants/message';
import { useFormInput } from '../../hooks/@shared/useFormInput/useFormInput';
import { isKoreanAndNumber } from '../../util/validator';
import NotificationInput from '../@common/NotificationInput/NotificationInput';

interface Props {
  initialValue?: string;
}

const LineNameInput: VFC<Props> = ({ initialValue = '' }) => {
  const [lineNameInfo, setLineNameInfo] = useFormInput(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeLineName: ChangeEventHandler<HTMLInputElement> = (event) => {
    const lineName = event.currentTarget.value;
    const canSubmit = lineName.length > 1 && isKoreanAndNumber(lineName);

    setLineNameInfo({
      data: lineName,
      canSubmit,
    });
    setErrorMessage(canSubmit ? '' : ERROR_MESSAGE.INVALID_LINE_NAME);
  };

  return (
    <NotificationInput
      value={lineNameInfo.data}
      onChange={onChangeLineName}
      messageInfo={{
        text: errorMessage,
        isError: true,
      }}
    />
  );
};

export default LineNameInput;

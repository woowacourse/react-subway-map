import React, { ChangeEventHandler, useEffect, useMemo, VFC } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../constants/a11y';
import { LINE, LINE_COLORS } from '../../constants/appInfo';
import { Palette } from '../../constants/palette';
import { useFormInput } from '../../hooks/@shared/useFormInput/useFormInput';
import { RootState } from '../../redux/store';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
import { LineColorContainer } from './LineColorRadio.styles';

interface Props {
  initialValue?: string;
}

const LineColorRadio: VFC<Props> = ({ initialValue = '' }) => {
  const { lines, errorMessage } = useSelector((state: RootState) => state.line);
  const [colorInputInfo, setColorInputInfo] = useFormInput(initialValue);
  const usedLineColors = useMemo(() => lines.map((line) => line.color), [lines]);

  const isUsedLineColor = (color: Palette): boolean => usedLineColors.includes(color);

  const onChangeColor: ChangeEventHandler<HTMLInputElement> = (event) => {
    setColorInputInfo({
      data: event.currentTarget.value,
      canSubmit: true,
    });
  };

  useEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  }, [errorMessage]);

  return (
    <LineColorContainer justifyContent="space-between" alignItems="center">
      <span>{LABEL_TEXT.LINE_COLOR}</span>
      {LINE_COLORS.map((color) => (
        <ColorRadio
          key={color}
          value={color}
          checked={color === colorInputInfo.data}
          onChange={onChangeColor}
          radioColor={color}
          groupName={LINE.COLOR_SELECT_GROUP}
          disabled={isUsedLineColor(color)}
          labelText={{
            text: LABEL_TEXT.LINE_COLOR_SELECT_RADIO,
            isVisible: false,
          }}
          required
        />
      ))}
    </LineColorContainer>
  );
};

export default LineColorRadio;

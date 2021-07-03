import { Button } from '../../atoms';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { changeValue } from '../../contexts/FormContext/reducer';
import { Container } from './ColorSelector.styles';
export interface ColorSelectorProps {
  colorList?: string[];
}

const ColorSelector = ({ colorList }: ColorSelectorProps) => {
  const { dispatch } = useFormContext();

  const setColor = (color: string) => {
    const key = 'color';

    dispatch(changeValue(key, color));
  };

  return (
    <Container>
      {colorList?.map((color: string) => (
        <Button
          key={color}
          type="button"
          buttonTheme="colorPick"
          bgColor={color}
          onClick={() => setColor(color)}
        />
      ))}
    </Container>
  );
};

export default ColorSelector;

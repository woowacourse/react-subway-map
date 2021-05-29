import ColorButton from '../../atoms/ColorButton/ColorButton';
import { Container } from './ColorSelector.styles';

export interface ColorSelectorProps {
  colorList?: string[];
  setColor: (color: string) => void;
}

const ColorSelector = ({ colorList, setColor }: ColorSelectorProps) => {
  return (
    <Container>
      {colorList?.map((color: string) => (
        <ColorButton key={color} bgColor={color} onClick={() => setColor(color)} />
      ))}
    </Container>
  );
};

export default ColorSelector;

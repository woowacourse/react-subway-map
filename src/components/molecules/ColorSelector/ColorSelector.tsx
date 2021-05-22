import ColorButton from '../../atoms/ColorButton/ColorButton';
import { Container } from './ColorSelector.styles';

export enum LineColor {
  COLOR_1 = '#AC3686',
  COLOR_2 = '#DC2626',
  COLOR_3 = '#DB2777',
  COLOR_4 = '#ED8936',
  COLOR_5 = '#34D399',
  COLOR_6 = '#7C3AED',
  COLOR_7 = '#1D4ED8',
  COLOR_8 = '#6B7280',
  COLOR_9 = '#D6AF32',
  COLOR_10 = '#7B341E',
}

export interface ColorSelectorProps {
  colorList?: LineColor[];
  setColor: (color: LineColor) => void;
}

const ColorSelector = ({ colorList = Object.values(LineColor), setColor }: ColorSelectorProps) => {
  return (
    <Container>
      {colorList.map(color => (
        <ColorButton key={color} bgColor={color} onClick={() => setColor(color)} />
      ))}
    </Container>
  );
};

export default ColorSelector;

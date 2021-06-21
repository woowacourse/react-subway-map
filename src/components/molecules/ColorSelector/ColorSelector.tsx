import { Button } from '../../atoms';
import { Container } from './ColorSelector.styles';
export interface ColorSelectorProps {
  colorList?: string[];
  setColor: (color: string) => void;
}

const ColorSelector = ({ colorList, setColor }: ColorSelectorProps) => {
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

import PALETTE from '../../constants/palette';
import { Container, ColorOption } from './Palette.style';

interface PaletteProps {
  inputName: string;
  colors: {
    name: string;
    disabled: boolean;
  }[];
}

const Palette = ({ inputName, colors }: PaletteProps) => (
  <Container aria-label="색상 선택">
    {colors.map(({ disabled, name }) => (
      <label key={name} aria-label={`${name} 색상 선택`}>
        <input
          name={inputName}
          type="radio"
          disabled={disabled}
          value={name}
          hidden
          aria-hidden="true"
        />
        <ColorOption backgroundColor={PALETTE[name]}></ColorOption>
      </label>
    ))}
  </Container>
);

export default Palette;
export type { PaletteProps };

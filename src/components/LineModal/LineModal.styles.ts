import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StationInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const DropdownWrapper = styled.div`
  flex: 1;
`;

const PaletteContainer = styled.div``;

const PaletteLabel = styled.label`
  font-size: 12px;
  color: ${PALETTE.DARK_GRAY};
`;

const PaletteContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const ColorPalette = styled.ul`
  display: grid;
  width: 224px;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 6px;
  row-gap: 6px;
`;

const ColorOption = styled.li<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border: 2px solid ${PALETTE.DARK_GRAY};
  }
`;

const SelectedColor = styled.div`
  width: 100%;
  height: 86px;
  margin-left: 12px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  border: 1px solid ${PALETTE.LIGHT_GRAY};
  text-align: center;
  line-height: 86px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 36px;
`;

export default {
  Container,
  StationInputWrapper,
  DropdownWrapper,
  PaletteContent,
  PaletteContainer,
  PaletteLabel,
  ColorPalette,
  ColorOption,
  SelectedColor,
  ButtonsContainer,
};

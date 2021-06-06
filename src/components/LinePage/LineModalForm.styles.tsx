import styled from '@emotion/styled';
import { COLOR } from '../../constants/styleConstant';

export const LineModalForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 2.5rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const SelectInputWrapper = styled.div`
  width: 100%;
  height: 3rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Message = styled.div<{ textAlign?: 'left' | 'center' | 'right' }>`
  width: 100%;
  height: 1rem;
  padding: 0 1rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  color: ${COLOR.RED_400};
`;

export const Arrow = styled.div`
  margin: 0 1rem;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ButtonWrapper = styled.div`
  padding-left: 1.5rem;
  width: 12rem;
`;

export const PaletteWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
`;

export const PaletteContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export const PaletteTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

export const Palette = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  border: none;
  background-color: ${({ color, theme }) => (color ? color : theme.primaryColor)};
  cursor: pointer;
`;

export const SelectedPalette = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  width: 9rem;
  height: 9rem;
  color: ${COLOR.BLACK};
  text-align: center;
  border-radius: 1rem;
  background-color: ${({ color }) => (color ? color : COLOR.WHITE)};
  border: 4px solid ${COLOR.GRAY_800};
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 6;
  grid-column-end: 8;
`;

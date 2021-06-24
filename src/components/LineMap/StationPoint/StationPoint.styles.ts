import styled, { css } from 'styled-components';
import { Palette } from '../../../constants/palette';

interface StationPointProps {
  canTransfer: boolean;
}

export const StationPointContainer = styled.li<StationPointProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border: 1px solid ${Palette.BLACK_400};
    border-radius: 50%;
    margin-bottom: 0.25rem;
    z-index: 1;
  }

  ${({ canTransfer }) => canTransfer && transferStation}
`;

const transferStation = css`
  &::before {
    background: linear-gradient(135deg, red 0 50%, blue 50% 100%);
  }
`;

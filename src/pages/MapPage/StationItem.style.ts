import { Properties } from 'csstype';
import styled from 'styled-components';

import PALETTE from '../../constants/palette';

interface StationMarkerProps extends Properties {
  lineColor?: string;
  includedLines?: {
    id: number;
    name: string;
    color: string;
  }[];
}

const StationRail = styled.span<StationMarkerProps>`
  display: inline-block;
  width: 3.5rem;
  height: 0.3rem;
  transform: translate(-0.1rem, 0.05rem);
  z-index: 9;

  background-color: ${({ lineColor }) =>
    PALETTE[`${lineColor}`] ? PALETTE[`${lineColor}`] : PALETTE.GRAY_500};
`;

const StationMarker = styled.span<StationMarkerProps>`
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  transform: translate(-0.125rem, 0.45rem);
  background-color: white;
  width: 0.75rem;
  height: 0.75rem;
  z-index: 10;

  ${({ includedLines, lineColor }) =>
    includedLines && includedLines?.length > 1
      ? `border: 0.15rem solid black;`
      : `border: 0.125rem solid ${PALETTE[`${lineColor}`]};
    `}
`;

const StationName = styled.span<StationMarkerProps>`
  display: inline-block;
  position: absolute;
  transform-origin: 0%;
  font-size: 0.7rem;
  transform: rotate(-45deg) translate(0.3rem, -0.3rem);

  ${({ includedLines }) => (includedLines && includedLines?.length > 1 ? `font-weight: bold;` : '')}
`;

const IncludedLines = styled.div`
  width: fit-content;
  position: relative;
  transform: translate(0.85rem, 0.25rem);

  * {
    margin-left: 0.125rem;
  }
`;

export { StationRail, StationMarker, StationName, IncludedLines };

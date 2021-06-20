import styled from 'styled-components';
import PALETTE from '../../constants/palette';
import { LineColor } from '../../types';
import Container from '../@common/Container/Container.styles';

export const DetailedLineContainer = styled.div`
  flex-direction: column;
  width: 100%;
  border: 1px solid ${PALETTE.GRAY_300};
  border-radius: 1rem;
  padding: 1rem;
`;

interface LineColorDotProps {
  color: LineColor;
}

export const LineColorDot = styled.div<LineColorDotProps>`
  width: 1rem;
  height: 1rem;
  border: 1px solid ${PALETTE.GRAY_300};
  border-radius: 0.375rem;
  margin-right: 0.5rem;
  background-color: ${({ color }) => color ?? 'none'};
`;

export const LineNameContainer = styled(Container)`
  padding: 1rem;
`;

export const LineName = styled.h2`
  font-size: 1.25rem;
  line-height: 1rem;
  font-weight: 400;
`;

export const StationList = styled.ul`
  display: flex;
  padding: 1rem;

  & > li {
    position: relative;
    box-sizing: border-box;
    border: 1px solid ${PALETTE.GRAY_300};
    padding: 0.5rem;
    border-radius: 0.75rem;
    margin-right: 2rem;

    &::after {
      position: absolute;
      left: 100%;
      top: 50%;
      content: '';
      width: calc(2rem + 1px);
      height: 1px;
      background-color: ${PALETTE.GRAY_300};
    }

    &:last-child::after {
      width: 0;
    }
  }
`;

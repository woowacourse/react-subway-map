import { Properties } from 'csstype';
import styled from 'styled-components';
import PALETTE from '../../constants/palette';

const Container = styled.ul<Properties>`
  display: inline-flex;
  align-items: center;
  margin: 2.5rem 0;
  padding: 0;
  border-bottom: 0.4rem solid ${({ borderColor }) => PALETTE[borderColor ?? 'GRAY_300']};
`;

const LineTag = styled.li<Properties>`
  display: inline-flex;
  transform: translateY(calc(50% + 0.2rem));
  padding: 0.2rem 0.3rem;
  background-color: ${PALETTE.WHITE};
  border: 0.3rem solid ${({ borderColor }) => PALETTE[borderColor ?? 'GRAY_300']};
  border-radius: 0.8rem;

  padding: 0.3rem 0.8rem;
  font-size: 1rem;
  color: ${PALETTE.GRAY_600};
`;

const StationDot = styled.li<Properties>`
  list-style: none;
  background-color: ${PALETTE.WHITE};
  margin: 0 2rem;
  width: 1.8rem;
  height: 1.8rem;
  border: 0.4rem solid ${({ borderColor }) => PALETTE[borderColor ?? 'GRAY_300']};
  border-radius: 50%;

  position: relative;
  transform: translateY(calc(50% + 0.5rem));

  :last-child {
    margin-right: 0;
    transform: translate(1px, calc(50% + 0.5rem));
  }

  > span {
    position: absolute;
    width: 7.5rem;

    font-size: 0.8rem;
    top: -0.9rem;
    left: 0.9rem;
    transform-origin: 0% 0%;
    transform: rotate(-40deg);
  }
`;

export { Container, LineTag, StationDot };

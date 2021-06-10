import styled from 'styled-components';

import PALETTE from '../../../constants/palette';

const Container = styled.div`
  width: 100%;
`;

const BorderBox = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${PALETTE.GRAY_100};
  border-radius: 0.25rem;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:focus-within {
    border-color: ${PALETTE.GRAY_300};
  }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  padding: 0 0.2rem;
  font-size: 0.75rem;
  color: ${PALETTE.GRAY_400};

  left: 0.5rem;
  top: 0;
  transform: translateY(-50%);
  background-color: ${PALETTE.WHITE_100};
`;

const StatusText = styled.div`
  font-size: 0.8rem;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
`;

export { Container, BorderBox, Label, StatusText };

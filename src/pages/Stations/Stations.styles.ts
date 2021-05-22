import styled from 'styled-components';
import PALETTE from '../../constants/palette';

export const StationForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;

  & > label {
    flex-grow: 1;
    margin-right: 1.5rem;
  }
`;

export const HorizontalLine = styled.hr`
  margin: 3rem 0 0;
  border: none;
  height: 2px;
  background-color: ${PALETTE.GRAY[300]};
`;

export const StationList = styled.ul`
  margin: 2rem 3.5rem;
`;

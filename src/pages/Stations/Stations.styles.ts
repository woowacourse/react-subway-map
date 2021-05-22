import styled from 'styled-components';

export const StationForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;

  & > label {
    flex-grow: 1;
    margin-right: 1.5rem;
  }
`;

export const StationList = styled.ul`
  margin: 2rem 3.5rem;
`;

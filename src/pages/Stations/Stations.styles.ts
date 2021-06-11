import styled from 'styled-components';
import Form from '../../components/@common/Form/Form';

export const StationForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;

  & > .station-name-input {
    flex-grow: 1;
    margin-right: 1.5rem;
  }

  button {
    height: 3.125rem;
    width: 6rem;
  }
`;

export const StationName = styled.p`
  margin-left: 1rem;
`;

export const StationList = styled.ul`
  margin: 2rem 3.5rem;
`;

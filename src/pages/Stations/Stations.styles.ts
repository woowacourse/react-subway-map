import styled from 'styled-components';
import NotificationInput from '../../components/@common/NotificationInput/NotificationInput';

export const StationNameInput = styled(NotificationInput)``;

export const StationForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;

  ${StationNameInput} {
    flex-grow: 1;
    margin-right: 1.5rem;
  }

  button {
    height: 3.125rem;
  }
`;

export const StationName = styled.p`
  margin-left: 1rem;
`;

export const StationList = styled.ul`
  margin: 2rem 3.5rem;
`;

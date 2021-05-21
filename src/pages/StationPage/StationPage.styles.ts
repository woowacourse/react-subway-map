import styled from 'styled-components';

export const StationPage = styled.div`
  margin: 2rem 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 320px;
  max-width: 768px;
`;

export const FormContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ListContainer = styled.div``;

export const HeaderText = styled.h2`
  margin: 0;
  margin-bottom: 1em;
  text-align: center;
  font-size: 2rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const StationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StationItem = styled.li`
  padding: 0.3em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.secondary};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const StationName = styled.span`
  margin-left: 0.8em;
  font-size: 1.1rem;
`;

export const StationOptionWrapper = styled.div``;

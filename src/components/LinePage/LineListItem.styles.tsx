import styled from '@emotion/styled';

export const LineListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 1rem 1.5rem;
  width: 100%;
`;

export const Name = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
`;

export const ButtonWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
`;

export const Button = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;

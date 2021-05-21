import styled from 'styled-components';

export const Card = styled.div`
  box-shadow: 0 4px 6px -1px ${({ theme }) => theme.color.border.secondary};
  border-radius: 4px;

  &::before {
    content: '';
    width: 100%;
    height: 7px;
    display: block;
    background-color: ${({ theme }) => theme.color.bg.primary};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`;

export const Inner = styled.div`
  padding: 1.5rem;
`;

import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 2em;
  background-color: ${({ theme }) => theme.color.bg.primary};
  box-shadow: 0 0 5px 2px ${({ theme }) => theme.color.border.secondary};
`;

export const Logo = styled.h1`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 24px;
  margin: 0;

  svg {
    margin-right: 10px;
    width: 30px;
  }
`;

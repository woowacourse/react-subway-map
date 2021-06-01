import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.bg.secondary.default};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inner = styled.div`
  width: 80%;
  min-width: 320px;
  max-width: 768px;
  background-color: ${({ theme }) => theme.color.bg.white};
  box-shadow: 0 4px 6px -1px ${({ theme }) => theme.color.border.secondary};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1.5rem;
`;

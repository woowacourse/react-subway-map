import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 5px 5px 20px 0 rgb(0 0 0 / 50%);
  width: 304px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.bg.white};
  line-height: 1.33333;
  letter-spacing: -0.6px;

  & button {
    width: 50%;
    height: 60px;
    border-top: 1px solid ${({ theme }) => theme.color.border.secondary};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.color.border.secondary};
    }
  }
`;

export const TextWrapper = styled.section`
  padding: 40px 28px;
`;

export const CancelButton = styled.button`
  border: none;
  border-right: 1px solid ${({ theme }) => theme.color.border.secondary};
`;

export const ConfirmButton = styled.button`
  border: none;
  font-weight: 600;
`;

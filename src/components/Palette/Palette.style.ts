import styled from 'styled-components';

const Container = styled.fieldset`
  width: 100%;
  display: flex;
  padding: 0.1rem 0;

  label {
    width: 100%;
    display: flex;
  }

  & input:disabled + span {
    :before {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      content: '✕';
      font-size: 2rem;
      font-weight: 600;
      color: white;
    }
    cursor: not-allowed;
    opacity: 0.5;
  }

  & input:checked + span {
    :before {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      content: '✓';
      font-size: 1.6rem;
      color: white;
    }
  }

  & input:enabled + span:hover {
    transform: translateY(-10%);
  }
`;

const InputBox = styled.span<React.CSSProperties>`
  width: 2rem;
  height: 2rem;
  margin: 0.2rem;
  cursor: pointer;
  border-radius: 0.2rem;
  transition: transform 0.1s ease;

  background-color: ${({ backgroundColor }) => backgroundColor ?? 'transparent'};
`;

export { Container, InputBox };

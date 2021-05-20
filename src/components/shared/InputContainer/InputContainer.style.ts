import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #bbbbbb;
  border-radius: 0.25rem;
  display: flex;
  position: relative;

  &:focus-within {
    border-color: #777777;
  }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  padding: 0 0.2rem;
  font-size: 0.75rem;
  color: #777777;

  left: 0.5rem;
  top: 0;
  transform: translateY(-50%);
  background-color: white;
`;

export { Container, Label };

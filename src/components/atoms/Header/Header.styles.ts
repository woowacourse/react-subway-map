import styled from '@emotion/styled';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ hasExtra }: { hasExtra: boolean }) =>
    hasExtra ? 'space-between' : 'center'};

  padding: 1rem 4rem 0 4rem;

  & > h3 {
    font-size: 2rem;
  }

  & > button {
    padding: 1rem 1.5rem;
  }
`;

export { Container };

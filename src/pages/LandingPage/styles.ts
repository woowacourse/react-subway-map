import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Text = styled.div`
  font-size: 2rem;
`;

const Image = styled.img`
  width: 360px;
  height: auto;
  margin: auto;
`;

export default { Container, Text, Image };

import styled from '@emotion/styled';

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem 1rem;
  background-color: #ffffff;

  & > span {
    font-size: 1.5rem;
  }
`;

const Wrapper = styled.div`
  & > button {
    margin-left: 6px;
  }
`;

export { Container, Wrapper };

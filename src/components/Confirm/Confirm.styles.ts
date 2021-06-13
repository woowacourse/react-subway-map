import styled from "styled-components";

export const Inner = styled.div`
  width: 300px;
  height: 180px;
  flex-wrap: wrap;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  height: 60%;
  border-bottom: 1px solid #e7e7e7;
`;

export const ButtonControls = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  font-weight: bold;

  > button {
    width: 50%;
    height: 100%;
  }

  > button:hover {
    background-color: #dadada;
  }

  > button:last-child {
    border-left: 1px solid #e7e7e7;
  }
`;

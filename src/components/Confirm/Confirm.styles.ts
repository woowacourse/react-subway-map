import styled from "styled-components";

import { COLOR } from "../../utils/constants/color";

const Block = styled.div`
  width: 300px;
  height: 180px;
  flex-wrap: wrap;
  border-radius: 4px;
  background-color: ${COLOR.WHITE};
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  height: 60%;
  border-bottom: 1px solid ${COLOR.GRAY_50};
`;

const ButtonControls = styled.section`
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
    background-color: ${COLOR.GRAY_100};
  }

  > button:last-child {
    border-left: 1px solid ${COLOR.GRAY_50};
  }
`;

export { Block, Title, ButtonControls };

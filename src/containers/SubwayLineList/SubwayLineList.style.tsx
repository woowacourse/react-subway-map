import styled from "styled-components";
import { FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import { COLOR } from "../../constants/color";

export const SubwayLineListBlock = styled(FlexCenter)`
  margin-top: 3.25rem;
  padding-bottom: 3.25rem;
  width: 80%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    height: 10px;
    border-radius: 8px;
    background-color: #e7f4ff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR.CYAN_400};
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 8px;
  }
`;

export const LineItemHeader = styled.span<{ backgroundColor: string }>`
  width: 100%;
  border-radius: 8px;
  padding: 14px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

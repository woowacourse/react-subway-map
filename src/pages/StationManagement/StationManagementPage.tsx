import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { StationManagementPageBlock } from "./StationManagementPage.styles";

const StationManagementPage = () => {
  return (
    <StationManagementPageBlock>
      <Block style={{ marginTop: "2.5rem", width: "540px" }}>
        <h2>🚉역 관리</h2>
        <Input placeholder="역 이름"></Input>
        <Button>확인</Button>
      </Block>
    </StationManagementPageBlock>
  );
};
export default StationManagementPage;

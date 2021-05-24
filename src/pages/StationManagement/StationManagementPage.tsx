import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { StationManagementPageBlock } from "./StationManagementPage.styles";
import { Flex, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { stations } from "../../mocks/mocks";

const StationManagementPage = () => {
  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <h2 style={{ marginBottom: "1rem" }}>🚉역 관리</h2>
        <Flex style={{ width: "100%", marginBottom: "1rem" }}>
          <Input placeholder="역 이름" style={{ marginRight: "10px" }}></Input>
          <Button type="button">확인</Button>
        </Flex>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          {stations.map(({ id, name }) => (
            <ListItem key={id} style={{ padding: "9px" }}>
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
    </FlexCenter>
  );
};
export default StationManagementPage;

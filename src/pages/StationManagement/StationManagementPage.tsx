import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { StationManagementPageBlock } from "./StationManagementPage.styles";
import { Flex, FlexCenter, FlexColumn } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { stations } from "../../mocks/mocks";

const StationManagementPage = () => {
  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <h2 style={{ marginBottom: "1rem" }}>🚉역 관리</h2>
        <Flex style={{ width: "100%", marginBottom: "1rem" }}>
          <Input placeholder="역 이름" style={{ marginRight: "10px" }}></Input>
          <Button>확인</Button>
        </Flex>
        <FlexColumn style={{ width: "100%" }}>
          {stations.map((station) => (
            <ListItem key={station.id} style={{ padding: "9px" }}>
              {station.name}
            </ListItem>
          ))}
        </FlexColumn>
      </Block>
    </FlexCenter>
  );
};
export default StationManagementPage;

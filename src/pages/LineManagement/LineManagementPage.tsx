import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import ListItem from "../../components/ListItem/ListItem";
import { lines } from "../../mocks/mocks";
import { CIRCLE_COLOR } from "../../constants/color";

const LineManagementPage = () => {
  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>🛤️ 노선 관리</h2>
          <Button>노선 추가</Button>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          {lines.map(({ id, color, name }) => (
            <ListItem
              key={id}
              circleColor={CIRCLE_COLOR[color]}
              onUpdate={() => {}}
              onDelete={() => {}}
              style={{ padding: "9px" }}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default LineManagementPage;

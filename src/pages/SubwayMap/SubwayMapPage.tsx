import Block from "../../components/Block/Block";
import { FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";

import { SIZE } from "../../constants/size";

const SubwayMapPage = () => (
  <FlexCenter>
    <Block
      style={{
        marginTop: "2.5rem",
        width: SIZE.PAGE_CONTAINER_WIDTH,
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      SubwayMapPage
    </Block>
  </FlexCenter>
);

export default SubwayMapPage;

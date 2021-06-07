import { Block } from "../../components/";
import { FlexCenter } from "../../components/";

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

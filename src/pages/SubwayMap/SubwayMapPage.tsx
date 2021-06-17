import { SubwayMapPageBlock } from "./SubwayMapPage.styles";
import { useQuery } from "react-query";
import { requestSubwayMap } from "../../apis/subwayMap";
import SubwayLineList from "../../containers/SubwayLineList/SubwayLineList";

const fetchSubwayMap = async () => {
  const lines = await requestSubwayMap.getSubwayMap();

  return lines;
};

const SubwayMapPage = () => {
  const { data: lines, isLoading, error } = useQuery("subwayMap", fetchSubwayMap);

  if (isLoading) {
    return <h3 style={{ textAlign: "center", marginTop: "3rem" }}>로딩 중</h3>;
  }

  if (error || !lines) {
    return <h3 style={{ textAlign: "center", marginTop: "3rem" }}>다시 시도해주세요</h3>;
  }

  return (
    <SubwayMapPageBlock>
      <SubwayLineList lines={lines} />
    </SubwayMapPageBlock>
  );
};

export default SubwayMapPage;

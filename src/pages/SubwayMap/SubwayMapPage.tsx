import { SubwayMapPageBlock, LineItemHeader, SubwayLineListBlock } from "./SubwayMapPage.styles";
import ScrollArea from "../../components/ScrollArea/ScrollArea";
import LabeledNode from "../../components/LabeledNode/LabeledNode";
import useSubwayMap from "../../hooks/useSubwayMap";
import { Section } from "../../@types/types";
import { CIRCLE_COLOR } from "../../constants/color";
import { FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import { useEffect } from "react";

const SubwayMapPage = () => {
  const { subwayMapItems, loading, error, getSubwayMap } = useSubwayMap();

  useEffect(() => {
    getSubwayMap();
  }, []);

  const getSectionNodeList = (sections: Section[], lineColor: string) =>
    sections.map((section, index) => {
      if (index === sections.length - 1) {
        return (
          <div key={section.downStation.id}>
            <div style={{ marginTop: "10px" }}>
              <LabeledNode color={lineColor} title={section.upStation.name} content={`${section.distance}km`} />
            </div>
            <div style={{ marginTop: "10px" }}>
              <LabeledNode color={lineColor} vertextIncluded={false} title={section.downStation.name} />
            </div>
          </div>
        );
      }

      return (
        <div style={{ marginTop: "10px" }}>
          <LabeledNode
            color={lineColor}
            key={section.upStation.id}
            title={section.upStation.name}
            content={`${section.distance}km`}
          />
        </div>
      );
    });

  const subwayLineList = subwayMapItems.map((subwayMapItem) => {
    const stationNodeList = getSectionNodeList(subwayMapItem.sections, CIRCLE_COLOR[subwayMapItem.color]);

    return (
      <FlexCenter style={{ flexDirection: "column", marginRight: "5rem" }} key={subwayMapItem.id}>
        <LineItemHeader backgroundColor={CIRCLE_COLOR[subwayMapItem.color]}>{subwayMapItem.name}</LineItemHeader>
        <ScrollArea
          style={{ padding: "1.25rem 1rem" }}
          scrollTrackColor={"#eee"}
          scrollBarColor={CIRCLE_COLOR[subwayMapItem.color]}
          scrollTrackWidth={"20px"}
        >
          {stationNodeList}
        </ScrollArea>
      </FlexCenter>
    );
  });

  if (loading) {
    return <h3 style={{ textAlign: "center", marginTop: "3rem" }}>로딩 중</h3>;
  }

  if (error || !subwayMapItems) {
    return <h3 style={{ textAlign: "center", marginTop: "3rem" }}>다시 시도해주세요</h3>;
  }

  return (
    <SubwayMapPageBlock>
      <SubwayLineListBlock>{subwayLineList}</SubwayLineListBlock>
    </SubwayMapPageBlock>
  );
};

export default SubwayMapPage;

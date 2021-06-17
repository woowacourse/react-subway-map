import ScrollArea from "../../components/ScrollArea/ScrollArea";
import LabeledNode from "../../components/LabeledNode/LabeledNode";
import { FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import { LineItemHeader, SubwayLineListBlock } from "./SubwayLineList.style";

import { Line, Section } from "../../@types/types";
import { CIRCLE_COLOR } from "../../constants/color";

interface Props {
  lines: Line[];
}

const SubwayLineList = ({ lines }: Props) => {
  const getSectionNodeList = (sections: Section[], lineColor: string) =>
    sections.map((section, index) => {
      if (sections.length === 1) {
        return (
          <>
            <div style={{ marginTop: "10px" }}>
              <LabeledNode
                color={lineColor}
                key={section.upStation.id}
                title={section.upStation.name}
                content={`${section.distance}km`}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <LabeledNode
                color={lineColor}
                vertextIncluded={false}
                key={section.downStation.id}
                title={section.downStation.name}
                content={`${section.distance}km`}
              />
            </div>
          </>
        );
      }

      if (index === sections.length - 1) {
        return (
          <div style={{ marginTop: "10px" }}>
            <LabeledNode
              color={lineColor}
              vertextIncluded={false}
              key={section.downStation.id}
              title={section.downStation.name}
              content={`${section.distance}km`}
            />
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

  const subwayLineList = lines.map((line) => {
    const stationNodeList = getSectionNodeList(line.sections, CIRCLE_COLOR[line.color]);

    return (
      <FlexCenter style={{ flexDirection: "column", marginRight: "5rem" }}>
        <LineItemHeader backgroundColor={CIRCLE_COLOR[line.color]}>{line.name}</LineItemHeader>
        <ScrollArea
          key={line.id}
          style={{ padding: "1.25rem 1rem" }}
          scrollTrackColor={"#eee"}
          scrollBarColor={CIRCLE_COLOR[line.color]}
          scrollTrackWidth={"20px"}
        >
          {stationNodeList}
        </ScrollArea>
      </FlexCenter>
    );
  });

  return <SubwayLineListBlock>{subwayLineList}</SubwayLineListBlock>;
};

export default SubwayLineList;

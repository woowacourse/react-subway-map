import React from 'react';
import { ILineRes, ISectionRes } from '../../../type';
import { LineWrapper, LineName, StationListWrapper, DistanceText } from './LineLookUp.styles';

export interface ILineLoopUpProp {
  lines: ILineRes[] | undefined | null;
}

const getTargetSection = (sections: ISectionRes[], targetUpStationId: number) =>
  sections.find(section => section.upStation.id === targetUpStationId);

const getConsecutiveSections = (sections: ISectionRes[]) => {
  const result = [sections[0]];

  while (1) {
    const targetSection = getTargetSection(sections, result[0].downStation.id);

    if (!targetSection) break;

    result.unshift(targetSection);
  }

  return result.reverse();
};

const LineLookUp = ({ lines }: ILineLoopUpProp) => (
  <div>
    {lines?.map(line => (
      <LineWrapper key={line.id}>
        <LineName color={line.color}>{line.name}</LineName>
        <StationListWrapper key={line.id}>
          {getConsecutiveSections(line.sections).map((section, index, self) => (
            <React.Fragment key={index}>
              <li key={section.upStation.id}>{section.upStation.name}</li>
              <DistanceText>{section.distance}</DistanceText>
              {index === self.length - 1 && (
                <li key={section.downStation.id}>{section.downStation.name}</li>
              )}
            </React.Fragment>
          ))}
        </StationListWrapper>
      </LineWrapper>
    ))}
  </div>
);

export default LineLookUp;

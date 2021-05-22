import React, { useState } from 'react';
import CardLayout from 'components/CardLayout/CardLayout';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import IconButton from 'components/shared/IconButton/IconButton';
import Styled from './styles';
import deleteIcon from 'assets/delete.png';

const lines = [
  { name: '1호선', color: '#9ca3af', stations: ['노량진', '신도림', '몰라요'] },
  { name: '2호선', color: '#f87171', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '3호선', color: '#fbbf24', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '5호선', color: '#f6ad54', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '9호선', color: '#34d399', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '신분당선', color: '#60a5fa', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '4호선', color: '#27c6da', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '6호선', color: '#818cf8', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '7호선', color: '#a78bfa', stations: ['잠실', '잠실새내', '잠실나루'] },
  { name: '8호선', color: '#f472b6', stations: ['잠실', '잠실새내', '잠실나루'] },
];

const SectionPage = () => {
  const [line, setLine] = useState<{ name: string; color: string; stations: string[] }>();

  const lineNames = lines.map((line) => line.name);

  const selectLine = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const targetLine = lines.find((line) => line.name === event.target.value);
    setLine(targetLine);
  };

  return (
    <CardLayout title="구간 관리">
      <Styled.TopContaier>
        <Dropdown defaultOption="노선 선택" options={lineNames} onSelect={selectLine} />
        <Styled.AddButtonWrapper>
          <Styled.AddButton>+</Styled.AddButton>
        </Styled.AddButtonWrapper>
      </Styled.TopContaier>
      {line && (
        <Styled.LineDetail>
          <Styled.LineName color={line.color}>{line.name}</Styled.LineName>
          <Styled.SectionsContainer>
            {line.stations.map((station) => (
              <Styled.SectionItem key={station}>
                {station}
                <IconButton>
                  <Styled.Icon src={deleteIcon} alt="delete" />
                </IconButton>
              </Styled.SectionItem>
            ))}
          </Styled.SectionsContainer>
        </Styled.LineDetail>
      )}
    </CardLayout>
  );
};

export default SectionPage;

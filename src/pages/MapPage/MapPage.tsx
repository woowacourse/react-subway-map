import { useContext, useEffect } from 'react';

import { PageProps } from '../types';
import useLines from '../../hooks/useLines';
import { APIResponseDataLine } from '../../apis/line';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../components/shared/SnackBar/SnackBarProvider';

import PALETTE from '../../constants/palette';
import { ColorDot, Heading1, List } from '../../components/shared';
import { Container, MapBox, LineBox, Distance } from './MapPage.style';
import noLine from '../../assets/images/no_line.png';

const LINE_BEFORE_FETCH: APIResponseDataLine[] = []; // FETCH 이전과 이후의 빈 배열을 구분

const MapPage = ({ setIsLoading }: PageProps) => {
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine, lineRequestError] =
    useLines(LINE_BEFORE_FETCH);

  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE_100;
  const addSnackBar = useContext(SnackBarContext)?.pushMessage;

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);
    const responses = await fetchLines();

    if (!responses) {
      addSnackBar?.(lineRequestError.message);
      setLines([]);
    }

    clearTimeout(timer);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <MapBox hatColor={themeColor} backgroundColor={PALETTE.WHITE_100}>
        <Heading1>지하철 노선 전체보기</Heading1>
        {lines.length === 0 && lines !== LINE_BEFORE_FETCH ? (
          <img src={noLine} alt="지하철 노선 없음 이미지" />
        ) : (
          lines.map(({ id, name, color, stations }) => (
            <LineBox hatColor={PALETTE[color]} key={id} title={name}>
              <List position="relative">
                {stations.map(({ id: station_id, name: station_name, distance }) => (
                  <li key={station_id}>
                    <ColorDot size="s" backgroundColor={PALETTE[color]} />
                    <p>{station_name}</p>
                    {distance && <Distance>{`거리 : ${distance}`}</Distance>}
                  </li>
                ))}
              </List>
            </LineBox>
          ))
        )}
      </MapBox>
    </Container>
  );
};

export default MapPage;

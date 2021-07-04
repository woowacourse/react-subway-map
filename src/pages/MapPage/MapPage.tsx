import { useContext, useEffect } from 'react';

import Box from '../../components/shared/Box/Box';
import SectionGraph from '../../components/SectionGraph/SectionGraph';
import { Heading1 } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';

import useLines from '../../hooks/useLines';
import PALETTE from '../../constants/palette';
import { Container, Lines } from './MapPage.style';
import { LoadingContext } from '../../contexts/LoadingContext';

const MapPage = () => {
  const { lines, fetchLines } = useLines([]);

  const themeColor = useContext(ThemeContext)?.themeColor;
  const callWithLoading = useContext(LoadingContext)?.callWithLoading;

  useEffect(() => {
    callWithLoading?.(fetchLines);
  }, [callWithLoading, fetchLines]);

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 전체보기</Heading1>
        <Lines>
          {lines.map((line) => (
            <div key={line.id}>
              <SectionGraph line={line} />
            </div>
          ))}
        </Lines>
      </Box>
    </Container>
  );
};

export default MapPage;

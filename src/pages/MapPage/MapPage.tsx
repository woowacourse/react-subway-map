import { Container } from './MapPage.style';

import notReady from '../../assets/images/not_ready.png';
import Box from '../../components/shared/Box/Box';
import PALETTE from '../../constants/palette';
import { PageProps } from '../types';

const MapPage = ({ setIsLoading }: PageProps) => {
  return (
    <Container>
      <img src={notReady} alt="서비스 준비중" />
    </Container>
  );
};

export default MapPage;

import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import AddLineForm from '../../components/LinePage/AddLineForm';
import LineListItem from '../../components/LinePage/LineListItem';
import * as S from './Line.styles';

const Line = () => {
  return (
    <S.Container>
      <ContentContainer hatColor='MINT_500'>
        <AddLineForm />
      </ContentContainer>
      <ContentContainer>
        <S.LineList>
          <LineListItem name='1호선' />
          <LineListItem name='2호선' />
          <LineListItem name='3호선' />
          <LineListItem name='4호선' />
          <LineListItem name='5호선' />
        </S.LineList>
      </ContentContainer>
    </S.Container>
  );
};

export default Line;

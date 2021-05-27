import { useEffect } from 'react';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddLineForm from '../../components/LinePage/AddLineForm';
import LineListItem from '../../components/LinePage/LineListItem';
import useLine from '../../hook/useLine';
import useStation from '../../hook/useStation';

import * as S from './Line.styles';

const Line = () => {
  const { lines, addLine, deleteLine, error, resetError } = useLine();
  const { stations } = useStation();

  useEffect(() => {
    if (error) {
      window.alert(error);
      resetError();
    }
  }, [error, resetError]);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddLineForm lines={lines} stations={stations} addLine={addLine} />
      </ContentContainer>
      <ContentContainer>
        <S.LineList>
          {lines.map(({ id, name, color }) => (
            <LineListItem key={id} name={name} id={id} color={color} deleteLine={deleteLine} />
          ))}
        </S.LineList>
      </ContentContainer>
    </S.Container>
  );
};

export default Line;

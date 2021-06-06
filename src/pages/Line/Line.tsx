import { useEffect } from 'react';
import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddLineForm from '../../components/LinePage/AddLineForm';
import LineListItem from '../../components/LinePage/LineListItem';
import { ROUTE } from '../../constants/route';
import useLine from '../../hook/useLine';
import useStation from '../../hook/useStation';
import useUser from '../../hook/useUser';
import * as S from './Line.styles';

const Line = () => {
  const { lines, addLine, deleteLine, error, resetError } = useLine();
  const { stations } = useStation();
  const { accessToken } = useUser();

  useEffect(() => {
    if (error) {
      window.alert(error);
      resetError();
    }
  }, [error, resetError]);

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

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

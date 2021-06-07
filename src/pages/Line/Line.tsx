import { useEffect } from 'react';
import { Redirect } from 'react-router';
import * as S from './Line.styles';

import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddLineForm from '../../components/LinePage/AddLineForm/AddLineForm';
import LineListItem from '../../components/LinePage/LineListItem/LineListItem';

import { ROUTE } from '../../constants/api';
import useStation from '../../hook/useStation';
import useLine from '../../hook/useLine';
import useUser from '../../hook/useUser';

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

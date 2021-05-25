import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddLineForm from '../../components/LinePage/AddLineForm';
import LineListItem from '../../components/LinePage/LineListItem';
import { RootState } from '../../modules';
import { getLinesAsync } from '../../modules/line/lineReducer';
import * as S from './Line.styles';

const Line = () => {
  const { lines, error } = useSelector((state: RootState) => state.line);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddLineForm />
      </ContentContainer>
      <ContentContainer>
        <S.LineList>
          {lines.map(({ id, name, color }) => (
            <LineListItem key={id} name={name} id={id} color={color} />
          ))}
        </S.LineList>
      </ContentContainer>
    </S.Container>
  );
};

export default Line;

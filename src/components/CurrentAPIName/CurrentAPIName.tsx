import { StyledCurrentAPIName } from './CurrentAPIName.styles';
import useAPI from '../../hooks/useAPI';
import { useHistory } from 'react-router';

const CurrentAPIName = () => {
  const { hasAPI, APIName } = useAPI();
  const history = useHistory();

  return (
    <StyledCurrentAPIName onClick={() => history.push('/')}>
      {hasAPI ? `${APIName}'` : '_____'}s API
    </StyledCurrentAPIName>
  );
};

export default CurrentAPIName;

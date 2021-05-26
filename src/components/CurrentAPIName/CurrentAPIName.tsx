import { useAppSelector } from '../../state/store';
import { StyledCurrentAPIName } from './CurrentAPIName.styles';

const CurrentAPIName = () => {
  const { APIName } = useAppSelector(({ API: { APIName } }) => ({ APIName }));

  return (
    <StyledCurrentAPIName>
      {!!APIName && `${APIName}'s API`}
    </StyledCurrentAPIName>
  );
};

export default CurrentAPIName;

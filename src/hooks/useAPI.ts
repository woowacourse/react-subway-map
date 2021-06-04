import { useAppSelector } from './../state/store';

const useAPI = () => {
  const { APIName } = useAppSelector(({ API: { APIName } }) => ({ APIName }));

  const hasAPI = !!APIName;

  return { APIName, hasAPI };
};

export default useAPI;

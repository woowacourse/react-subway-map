import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import { useAppSelector } from 'modules/hooks';
import { Line, User } from 'types';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import { ROUTE, END_POINT, RESPONSE_STATE, ALERT_MESSAGE, API_METHOD } from '../../constants';
import Loading from 'components/shared/Loading/Loading';
import LineMap from 'components/LineMap/LineMap';

const ViewAllPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [lines, setLines] = useState<Line[]>([]);
  const [mouseOverStationId, setMouseOverStationId] = useState(0);

  const { fetchData: getLinesAsync, loading: getLinesLoading } = useFetch(API_METHOD.GET);
  const { enqueueSnackbar } = useSnackbar();

  const isLoading = getLinesLoading;

  const getLines = async () => {
    const res = await getLinesAsync(END_POINT.LINES);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      setLines(res.data);
    }
  };

  useEffect(() => {
    const fetchLines = async () => {
      await getLines();
    };
    fetchLines();
  }, []);

  return (
    <CardLayout title={'전체 보기'}>
      <Loading isLoading={isLoading} />
      <Styled.LinesMap>
        {lines.map((line) => (
          <LineMap
            key={line.id}
            line={line}
            mouseOverStationId={mouseOverStationId}
            setMouseOverStationId={setMouseOverStationId}
          />
        ))}
      </Styled.LinesMap>
    </CardLayout>
  );
};

export default ViewAllPage;

import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import Button from 'components/shared/Button/Button';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Line, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import {
  ROUTE,
  REGEX,
  END_POINT,
  RESPONSE_STATE,
  ALERT_MESSAGE,
  CONFIRM_MESSAGE,
  NOTIFICATION,
  API_METHOD,
  INPUT,
} from '../../constants';
import useNotify from 'hooks/useNotify';
import Loading from 'components/shared/Loading/Loading';
import LineMap from 'components/LineMap/LineMap';

const ViewAllPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);
  if (!user) return <Redirect to={ROUTE.HOME} />;
  const [lines, setLines] = useState<Line[]>([]);

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
          <LineMap key={line.id} line={line} />
        ))}
      </Styled.LinesMap>
    </CardLayout>
  );
};

export default ViewAllPage;

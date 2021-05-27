import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../redux';
import { Container } from './style';

const Snackbar = () => {
  const { message } = useSelector(({ snackbar }) => snackbar);
  const [snackMessage, setSnackMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!message) return;

    setSnackMessage(message);
    dispatch(clearMessage(null));
  }, [message, dispatch]);

  useEffect(() => {
    const timerId = setTimeout(() => setSnackMessage(null), 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [snackMessage]);

  return (
    <>{snackMessage && <Container>{<span>{snackMessage}</span>}</Container>}</>
  );
};

export default Snackbar;

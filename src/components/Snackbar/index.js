import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../redux';
import { Container } from './style';

const Snackbar = () => {
  const { message } = useSelector(({ snackbar }) => snackbar);
  const [snackMessage, setSnackMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!message) return;
    setSnackMessage(message);
    setIsVisible(true);
    dispatch(clearMessage(null));
  }, [message, dispatch]);

  useEffect(() => {
    const messageTimer = setTimeout(() => setSnackMessage(null), 3000);
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 2200);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [snackMessage]);

  return (
    <Container isVisible={isVisible}>
      <span>{snackMessage}</span>
    </Container>
  );
};

export default Snackbar;

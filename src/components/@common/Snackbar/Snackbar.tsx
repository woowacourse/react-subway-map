import React from 'react';
import ReactDOM from 'react-dom';
import PALETTE from '../../../constants/palette';
import { SnackbarContainer } from './Snackbar.styles';

interface Props {
  message: string;
  duration?: number;
  backgroundColor?: string;
}

const snackbarRoot: HTMLElement | null = document.getElementById('snackbar-root');

const Snackbar = ({
  message,
  duration = 3000,
  backgroundColor = PALETTE.BLACK[300],
}: Props): JSX.Element => {
  return ReactDOM.createPortal(
    <SnackbarContainer key={Date.now()} backgroundColor={backgroundColor} duration={duration}>
      {message}
    </SnackbarContainer>,
    snackbarRoot as HTMLElement
  );
};

export default Snackbar;

import PropTypes from 'prop-types';
import React, { VFC } from 'react';
import ReactDOM from 'react-dom';
import { Palette } from '../../../constants/palette';
import { SnackbarContainer } from './Snackbar.styles';

interface Props {
  message: string;
  duration?: number;
  backgroundColor?: string;
}

const snackbarRoot: HTMLElement | null = document.getElementById('snackbar-root');

const Snackbar: VFC<Props> = ({
  message,
  duration = 3000,
  backgroundColor = Palette.BLACK_300,
}) => {
  return ReactDOM.createPortal(
    <SnackbarContainer key={Date.now()} backgroundColor={backgroundColor} duration={duration}>
      {message}
    </SnackbarContainer>,
    snackbarRoot as HTMLElement
  );
};

export default Snackbar;

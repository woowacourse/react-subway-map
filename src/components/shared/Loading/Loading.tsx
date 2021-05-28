import React from 'react';
import loadingIcon from 'assets/spinner.gif';
import Styled from './Loading.styles';

interface Props {
  isLoading: boolean;
}

const Loading = ({ isLoading }: Props) => {
  return <Styled.Container isLoading={isLoading} src={loadingIcon} />;
};

export default Loading;

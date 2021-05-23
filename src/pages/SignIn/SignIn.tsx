import React from 'react';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import SignInForm from '../../components/SignInPage/SignInForm';

const SignIn = () => {
  return (
    <ContentContainer hatColor='MINT_500'>
      <SignInForm />
    </ContentContainer>
  );
};

export default SignIn;

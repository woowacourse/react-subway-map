import { ContentContainer } from './components/@commons/ContentContainer/ContentContainer.styles';
import Navigation from './components/@commons/Navigation/Navigation';
import GlobalStyles from './Global.styles';
import * as S from './App.styles';
import SignInForm from './components/SignInPage/SignInForm';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <S.App>
        <Navigation />
        <S.Container>
          <ContentContainer hatColor='MINT_500'>
            <SignInForm />
          </ContentContainer>
        </S.Container>
      </S.App>
    </>
  );
};

export default App;

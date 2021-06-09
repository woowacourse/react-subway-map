import { Route, Switch } from 'react-router';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CurrentAPIName from './components/CurrentAPIName/CurrentAPIName';
import LineManagementPage from './pages/LineManagement/LineManagementPage';
import LoginPage from './pages/Login/LoginPage';
import SectionManagementPage from './pages/SectionManagement/SectionManagementPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import APISelectPage from './pages/APISelect/APISelectPage';
import StationManagementPage from './pages/StationManagement/StationManagementPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import useLogin from './hooks/useLogin';
import useAPI from './hooks/useAPI';

function App() {
  const { isLogin } = useLogin();
  const { hasAPI } = useAPI();

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={APISelectPage} />
        <PrivateRoute
          path="/login"
          redirectTo="/"
          component={LoginPage}
          isAuthenticated={hasAPI}
        />
        <PrivateRoute
          path="/signup"
          redirectTo="/"
          component={SignUpPage}
          isAuthenticated={hasAPI}
        />
        <PrivateRoute
          path="/line"
          redirectTo="/login"
          component={LineManagementPage}
          isAuthenticated={isLogin && hasAPI}
        />
        <PrivateRoute
          path="/section"
          redirectTo="/login"
          component={SectionManagementPage}
          isAuthenticated={isLogin && hasAPI}
        />
        <PrivateRoute
          path="/station"
          redirectTo="/login"
          component={StationManagementPage}
          isAuthenticated={isLogin && hasAPI}
        />
      </Switch>
      <CurrentAPIName />
    </div>
  );
}

export default App;

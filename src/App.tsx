import { useEffect } from "react";
import { BrowserRouter, Switch, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Loading from "./components/Loading/Loading";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import useAuth from "./hooks/useAuth";
import useStation from "./hooks/useStation";
import useLine from "./hooks/useLine";

import { PAGE_PATH, ROUTES } from "./constants/route";
import Routes from "./Routes";

const App = () => {
  const {
    isAuthenticated,
    loading: authLoading,
    error: authError,
    checkAccessToken,
  } = useAuth();
  const {
    getStations,
    loading: stationLoading,
    error: stationError,
  } = useStation();
  const { getLines, loading: lineLoading, error: lineError } = useLine();

  useEffect(() => {
    checkAccessToken();
    getStations();
    getLines();
  }, []);

  const errorMessage =
    authError?.message || stationError?.message || lineError?.message;

  const loading = authLoading || stationLoading || lineLoading;

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation routes={ROUTES} isAuthenticated={isAuthenticated} />
      <Switch>
        <Routes isAuthenticated={isAuthenticated} />
      </Switch>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {loading && <Loading />}
    </BrowserRouter>
  );
};

export default App;

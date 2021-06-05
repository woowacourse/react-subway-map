import { useEffect } from "react";
import { BrowserRouter, Switch, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import { PAGE_PATH, ROUTES } from "./constants/route";
import useAuth from "./hooks/useAuth";
import useStation from "./hooks/useStation";
import useLine from "./hooks/useLine";
import Navigation from "./components/Navigation/Navigation";
import Routes from "./Routes";

const App = () => {
  const { isAuthenticated, checkAccessToken, error: authError } = useAuth();
  const { getStations, error: stationError } = useStation();
  const { getLines, error: lineError } = useLine();

  useEffect(() => {
    checkAccessToken();
    getStations();
    getLines();
  }, []);

  return (
    <BrowserRouter>
      {(authError?.message || stationError?.message || lineError?.message) && (
        <p>
          {authError?.message || stationError?.message || lineError?.message}
        </p>
      )}
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation routes={ROUTES} isAuthenticated={isAuthenticated} />
      <Switch>
        <Routes isAuthenticated={isAuthenticated} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import { Navigation } from "./App.styles";
import { PAGE_PATH, navigationLinks } from "./constants/route";

function App() {
  const navigationButtons = navigationLinks.map((navigationLink) => (
    <Link to={navigationLink.link}>
      <Button buttonTheme="white" kind="rect">
        {navigationLink.title}
      </Button>
    </Link>
  ));

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem" }}>🚇 지하철 노선도</Header>
      <Navigation>{navigationButtons}</Navigation>
      <Switch>
        <Route path={PAGE_PATH.LOGIN}>
          <LoginPage />
        </Route>
        <Route path={PAGE_PATH.SIGN_UP}>
          <SignupPage />
        </Route>
        <Route path={[PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT]}>
          <StationManagementPage />
        </Route>
        <Route path={PAGE_PATH.LINE_MANAGEMENT}>
          <LineManagementPage />
        </Route>
        <Route path={PAGE_PATH.SECTION_MANAGEMENT}>
          <SectionManagementPage />
        </Route>
        <Route path={PAGE_PATH.SUBWAY_MANAGEMENT}>
          <SubwayMapPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

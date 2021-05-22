import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./App.styles";
import GlobalStyle from "./Global.styles";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";

enum PAGE_PATH {
  HOME = "/",
  LOGIN = "/login",
  SIGN_UP = "/signup",
  STATION_MANAGEMENT = "/station",
  LINE_MANAGEMENT = "/line",
  SECTION_MANAGEMENT = "/section",
  SUBWAY_MANAGEMENT = "/subway",
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
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
    </ThemeProvider>
  );
}

export default App;

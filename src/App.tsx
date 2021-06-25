import { useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import { Navigation } from "./App.styles";
import { PAGE_PATH, privateNavigationLinks, publicNavigationLinks } from "./constants/route";
import useAuth from "./hooks/useAuth";
import { Flex } from "./components/@shared/FlexContainer/FlexContainer";
import Select from "./components/Select/Select";
import { BASE_URL, API_PROVIDER, DEFAULT_API_PROVIDER, API_LOCAL_STORAGE_KEY } from "./apis";
import useLocalStorage from "./hooks/@common/useLocalStorage";
import axios from "axios";

const App = () => {
  const appLocalStorage = useLocalStorage<API_PROVIDER>(API_LOCAL_STORAGE_KEY, DEFAULT_API_PROVIDER);
  const history = useHistory();
  const { isAuthenticated, checkAccessToken, logout } = useAuth();

  useEffect(() => {
    axios.defaults.baseURL = BASE_URL[appLocalStorage.item];
  }, [appLocalStorage.item]);

  useEffect(() => {
    checkAccessToken();
  }, []);

  const navigationLinks = isAuthenticated ? publicNavigationLinks : privateNavigationLinks;

  const navigationLinkList = navigationLinks.map((navigationLink) => (
    <Link data-testid={`navigation-link-${navigationLink.link}`} to={navigationLink.link} key={navigationLink.link}>
      <Button type="button" buttonTheme="white" kind="rect">
        {navigationLink.title}
      </Button>
    </Link>
  ));

  const apiProviders = Object.keys(BASE_URL).map((name) => ({ value: name, text: name }));

  const apiProviderName = appLocalStorage.item;

  function isApiProvider(person: string): person is API_PROVIDER {
    return ["수리", "와일더", "에드", "포모"].includes(person);
  }

  const onApiProviderChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const apiProvider = event.currentTarget.value;

    if (!isApiProvider(apiProvider)) {
      return "수리";
    }

    appLocalStorage.set(apiProvider);
  };

  return (
    <>
      <Flex style={{ width: "100%", padding: "0.9375rem", justifyContent: "flex-end" }}>
        <Select
          defaultValue={apiProviderName}
          options={apiProviders}
          onChange={onApiProviderChange}
          style={{ width: "9.375rem", backgroundColor: "skyblue" }}
        ></Select>
      </Flex>

      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation>
        {navigationLinkList}
        {isAuthenticated && (
          <Link to={PAGE_PATH.LOGIN}>
            <Button
              data-testid={`navigation-link-logout`}
              type="button"
              onClick={logout}
              buttonTheme="white"
              kind="rect"
            >
              ❌ 로그아웃
            </Button>
          </Link>
        )}
      </Navigation>
      <Switch>
        <Route exact path={[PAGE_PATH.HOME, PAGE_PATH.LOGIN]}>
          <LoginPage />
        </Route>
        <Route exact path={PAGE_PATH.SIGN_UP}>
          <SignupPage />
        </Route>
        <Route exact path={PAGE_PATH.STATION_MANAGEMENT}>
          <StationManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.LINE_MANAGEMENT}>
          <LineManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.SECTION_MANAGEMENT}>
          <SectionManagementPage />
        </Route>
        <Route exact path={PAGE_PATH.SUBWAY_MANAGEMENT}>
          <SubwayMapPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;

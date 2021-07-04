import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import { API_INFO } from '../../constants/api';
import useThemeColor from '../../hooks/useThemeColor/useThemeColor';
import { changeOwner } from '../../redux/apiOwnerSlice';
import { logout } from '../../redux/loginSlice';
import { clearRootReducer, RootState, useAppDispatch } from '../../redux/store';
import { APIForm, APIList } from './Home.styles';

const Home = (): JSX.Element => {
  const themeColor = useThemeColor();
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();
  const [selectedAPI, setSelectedAPI] = useState(apiOwner);

  const onChangeApi: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setSelectedAPI(value);
  };

  const onSubmitAPI: FormEventHandler = (event) => {
    event.preventDefault();

    if (apiOwner === selectedAPI) return;

    clearRootReducer();
    dispatch(logout());
    dispatch(changeOwner(selectedAPI));
  };

  return (
    <CardTemplate titleText="API 선택" templateColor={themeColor[400]}>
      <APIForm onSubmit={onSubmitAPI}>
        <APIList>
          {Object.keys(API_INFO).map((apiInfoKey) => (
            <li key={apiInfoKey}>
              <ColorRadio
                groupName="api"
                value={apiInfoKey}
                radioColor={API_INFO[apiInfoKey].themeColor[300] as string}
                labelText={{ text: API_INFO[apiInfoKey].name, isVisible: true }}
                checked={apiInfoKey === selectedAPI}
                onChange={onChangeApi}
              />
            </li>
          ))}
        </APIList>
        <Button>선택</Button>
      </APIForm>
    </CardTemplate>
  );
};

export default Home;

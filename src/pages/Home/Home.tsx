import React, { ChangeEventHandler, FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import { API_INFO } from '../../constants/api';
import { changeOwner } from '../../redux/apiOwnerSlice';
import { logout } from '../../redux/loginSlice';
import { clearRootReducer, RootState, useAppDispatch } from '../../redux/store';
import { APIForm, APIList } from './Home.styles';

const Home: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();
  const [selectedAPI, setSelectedAPI] = useState(apiOwner);

  const onChangeApi: ChangeEventHandler<HTMLInputElement> = (event) => {
    const owner = event.target.value;
    setSelectedAPI(owner);
  };

  const onSubmitAPI = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (apiOwner === selectedAPI) return;

    clearRootReducer();
    dispatch(logout());
    dispatch(changeOwner(selectedAPI));
  };

  return (
    <CardTemplate titleText="API 선택" templateColor={API_INFO[apiOwner].themeColor[400]}>
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

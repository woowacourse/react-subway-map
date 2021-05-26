import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import { API_INFO } from '../../constants/api';
import { THEME_COLOR } from '../../constants/appInfo';
import { changeOwner } from '../../redux/apiOwnerSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { APIForm, APIList } from './Home.styles';

const Home: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();
  const [selectedAPI, setSelectedAPI] = useState(apiOwner);

  const onChangeApi = (event: ChangeEvent<HTMLInputElement>) => {
    const owner = event.target.value;
    setSelectedAPI(owner);
  };

  const onSubmitAPI = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (apiOwner === selectedAPI) return;

    dispatch(changeOwner(selectedAPI));
  };

  return (
    <CardTemplate titleText="API 선택" templateColor={THEME_COLOR[400]}>
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

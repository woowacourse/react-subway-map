import React, { FC, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import ColorRadio from '../../components/@common/ColorRadio/ColorRadio';
import { API_INFO } from '../../constants/api';
import { HOME } from '../../constants/appInfo';
import useInput from '../../hooks/@shared/useInput/useInput';
import { changeOwner } from '../../redux/slice/apiOwnerSlice';
import { logout } from '../../redux/slice/loginSlice';
import { clearRootReducer, RootState, useAppDispatch } from '../../redux/store';
import { APIForm, APIList } from './Home.styles';
import { LABEL_TEXT } from '../../constants/a11y';

const Home: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const dispatch = useAppDispatch();

  const [APIInput, onChangedAPI, setAPIInput] = useInput(({ setInput, targetValue }) => {
    setInput(targetValue);
  });

  const onSubmitAPI = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (apiOwner === APIInput) return;

    clearRootReducer();
    dispatch(logout());
    dispatch(changeOwner(APIInput));
  };

  useEffect(() => {
    setAPIInput(apiOwner);
  }, []);

  return (
    <CardTemplate
      titleText={LABEL_TEXT.API_SELECT}
      templateColor={API_INFO[apiOwner].themeColor[400]}
    >
      <APIForm onSubmit={onSubmitAPI}>
        <APIList>
          {Object.keys(API_INFO).map((apiInfoKey) => (
            <li key={apiInfoKey}>
              <ColorRadio
                groupName={HOME.API_SELECT_GROUP}
                value={apiInfoKey}
                radioColor={API_INFO[apiInfoKey].themeColor[300] as string}
                labelText={{ text: API_INFO[apiInfoKey].name, isVisible: true }}
                checked={apiInfoKey === APIInput}
                onChange={onChangedAPI}
              />
            </li>
          ))}
        </APIList>
        <Button>{LABEL_TEXT.SELECT}</Button>
      </APIForm>
    </CardTemplate>
  );
};

export default Home;

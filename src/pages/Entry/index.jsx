import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../components/@shared/Button";
import Main from "../../components/@shared/Main";
import API from "./constants";
import { setBaseURL } from "./baseURL";
import PATH from "../../constants/path";
import { logout } from "../Login/slice";

const Entry = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleButtonClick = (event) => {
    setBaseURL(API[event.target.name]);
    alert(`🎉🎉 ${event.target.name} 당첨 🎉🎉`);
    dispatch(logout());
    history.push(PATH.LOGIN);
  };

  return (
    <>
      <Main>
        <h2 className="flex justify-center mb-4 mt-6 p-4 text-gray-700 text-2xl font-medium">
          가장 취약할 것 같은 백엔드 크루의 API를 선택해주세요: 공개처형 🔫
        </h2>
        <ul className="flex space-x-4">
          {["검프", "포츈", "에어", "바다", "우기"].map((name) => (
            <li key={name}>
              <Button
                type="button"
                onClick={handleButtonClick}
                size="large"
                name={name}
              >
                {name}
              </Button>
            </li>
          ))}
        </ul>
      </Main>
    </>
  );
};

export default Entry;

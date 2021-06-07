import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PATH from "../../constants/path";
import { setBaseURL } from "../../pages/Entry/baseURL";
import { logout } from "../../pages/Login/slice";
import Button from "../@shared/Button";

const EntryCrewListItem = ({ name, baseURL }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleButtonClick = async () => {
    if (
      window.confirm(
        `🎉🎉 ${name} 당첨 🎉🎉\n\n※ API서버를 바꾸면 로그아웃됩니다.`
      )
    ) {
      setBaseURL(baseURL);
      dispatch(logout());
      history.push(PATH.LOGIN);
    }
  };

  return (
    <li>
      <Button type="button" onClick={handleButtonClick} size="large">
        {name}
      </Button>
    </li>
  );
};

EntryCrewListItem.propTypes = {
  name: PropTypes.string.isRequired,
  baseURL: PropTypes.string.isRequired,
};

export default EntryCrewListItem;

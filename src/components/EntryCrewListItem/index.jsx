import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import PATH from "../../constants/path";
import { setBaseURL } from "../../pages/Entry/baseURL";
import { logout } from "../../pages/Login/slice";
import Button from "../@shared/Button";
import Confirm from "../@shared/Confirm";

const EntryCrewListItem = ({ name, baseURL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, open, close] = useBoolean(false);

  const handleConfirm = () => {
    setBaseURL(baseURL);
    dispatch(logout());
    history.push(PATH.LOGIN);
  };

  const confirmMessage = `🎉🎉 ${name} 당첨 🎉🎉
  ※ API서버를 바꾸면 로그아웃됩니다.`;

  return (
    <li>
      <Confirm
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onReject={close}
        message={confirmMessage}
      />
      <Button type="button" onClick={open} size="large">
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

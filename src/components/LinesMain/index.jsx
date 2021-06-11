import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import STATUS from "../../constants/status";
import { selectLinesMessage } from "../../pages/Lines/slice";
import Loading from "../@shared/Loading";
import Main from "../@shared/Main";
import Button from "../@shared/Button";
import LinesList from "../LinesList";
import { useLinesStatus } from "../../pages/Lines/hooks";

const LinesMain = ({ openModal }) => {
  const status = useLinesStatus();
  const message = useSelector(selectLinesMessage);

  useEffect(() => {
    if (status === STATUS.FAILED) {
      alert(message);
    }
  }, [message, status]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} bgOpacity="10" />
      <Main>
        <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <div className="flex items-center justify-between px-4">
            <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
              노선 관리
            </h2>
            <Button onClick={openModal} type="button" size="medium">
              등록
            </Button>
          </div>
          <LinesList />
        </section>
      </Main>
    </>
  );
};

LinesMain.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default LinesMain;

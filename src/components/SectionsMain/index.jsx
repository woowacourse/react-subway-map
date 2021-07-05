import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useSelector } from "react-redux";
import { selectLinesList } from "../../pages/Lines/slice";
import Main from "../@shared/Main";
import Button from "../@shared/Button";
import ListSelect from "../ListSelect";
import SectionsDetail from "../SectionsDetail";

const SectionsMain = ({ lineId, onLineChange, onAdd }) => {
  const linesList = useSelector(selectLinesList);

  return (
    <Main className="relative">
      <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
        <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
          구간 관리
        </h2>
        <ListSelect
          onChange={onLineChange}
          value={lineId ?? ""}
          list={Array.from(linesList).reverse()}
          placeholder="노선 선택"
        />
        <div className="relative">
          <hr className="-mx-4 my-12" />
          <Button
            type="button"
            className={cx(
              "absolute -top-7 right-0 flex items-center justify-center w-12 h-12 text-3xl rounded-full focus:outline-none shadow-md",
              lineId ? "bg-yellow-300 hover:bg-yellow-400 " : "bg-gray-300"
            )}
            onClick={onAdd}
          >
            +
          </Button>
        </div>
        <SectionsDetail lineId={lineId} />
      </section>
    </Main>
  );
};

SectionsMain.propTypes = {
  lineId: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
  onLineChange: PropTypes.func.isRequired,
};

SectionsMain.defaultProps = {
  lineId: null,
};

export default SectionsMain;

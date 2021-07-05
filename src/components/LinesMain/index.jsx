import React from "react";
import PropTypes from "prop-types";

import Main from "../@shared/Main";
import Button from "../@shared/Button";
import LinesList from "../LinesList";

const LinesMain = ({ onAdd }) => (
  <Main className="relative">
    <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <div className="flex items-center justify-between px-4">
        <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
          노선 관리
        </h2>
        <Button onClick={onAdd} type="button" size="medium">
          등록
        </Button>
      </div>
      <LinesList />
    </section>
  </Main>
);

LinesMain.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
export default LinesMain;

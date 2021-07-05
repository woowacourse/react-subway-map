import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Main = ({ children, className }) => (
  <main className="min-w-screen-lg flex place-items-center h-screen-80">
    <div className={cx("m-auto py-12", className)}>{children}</div>
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Main.defaultProps = {
  className: null,
};

export default Main;

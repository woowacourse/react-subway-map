import React from "react";
import PropTypes from "prop-types";

const Main = ({ children }) => (
  <main className="min-w-screen-lg flex place-items-center h-screen-80">
    <div className="m-auto py-12">{children}</div>
  </main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

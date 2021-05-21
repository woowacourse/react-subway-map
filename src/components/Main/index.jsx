import React from "react";
import PropTypes from "prop-types";

const Main = ({ children }) => (
  <main className="min-w-screen-lg flex place-items-center h-screen-80">
    {children}
  </main>
);
Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

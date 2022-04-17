import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../Assets/Logos/marketlogo.svg";
import { scrollToTop } from "../../../Helpers/utils";

const Logo = ({ to = "/" }) => {
  return (
    <Link to={to} className="navbar-brand" onClick={scrollToTop}>
      <img src={logo} alt="idesign-logo" />
    </Link>
  );
};

export default Logo;

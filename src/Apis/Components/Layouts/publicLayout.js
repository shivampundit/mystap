import React, { Fragment } from "react";
import Header from "../Common/Header";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../Router/routes";
import Footer from "../Common/Footer";

const PublicLayout = () => {
  const { isLoggedIn, isProfileComplete } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  return isLoggedIn && isProfileComplete ? (
    <Navigate to={ROUTES.DASHBOARD} />
  ) : isLoggedIn && !isProfileComplete && pathname !== ROUTES.PROFILE_BUILD && pathname !== ROUTES.TERMS_AND_CONDITIONS ? (
    <Navigate to={ROUTES.PROFILE_BUILD} />
  ) : (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;

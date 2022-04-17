import React,{useState} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "../../Router/routes";
import { useSelector } from "react-redux";
import Sidebar from "../Common/Dashborad/Sidebar";
import Header from "../Common/Dashborad/Header";

const PrivateLayout = () => {
  // const { isLoggedIn, isProfileComplete } = useSelector((state) => state.auth);
  const [ isLoggedIn, isProfileComplete ] = useState(true);

  return isLoggedIn && isProfileComplete ? (
    <>
      <Header />
      <div className="main-wraper">
        <Sidebar />

        <Outlet />
      </div>
    </>
  ) : isLoggedIn && !isProfileComplete ? (
    <Navigate to={ROUTES.PROFILE_BUILD} />
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default PrivateLayout;

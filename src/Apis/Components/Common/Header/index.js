import React, { useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, NavItem, Offcanvas } from "react-bootstrap";
import { scrollToTop } from "../../../Helpers/utils";
import Logo from "../Logo";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../../Redux/Actions/auth";
import { confirmAlert } from "react-confirm-alert";
import { TOP_NAV_MENU } from "../../../Constants";
import { ROUTES } from "../../../Router/routes";

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [sideMenu, setSideMenu] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const itemClick = () => {
    setSideMenu(false);
    scrollToTop();
  };

  const logoutHandler = () => {
    confirmAlert({
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(handleLogout()),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="header">
      <Container>
        <Navbar expand="lg" expanded={sideMenu}>
          <Container className="ps-0 pe-0">
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={() => setSideMenu(true)}
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Logo />

            <NavItem className="mobile_viwe">
              {isLoggedIn ? (
                <span className="nav-link pointer interFont" onClick={logoutHandler}>
                  Logout
                </span>
              ) : (
                <Link
                  className="nav-link"
                  to={ROUTES.LOGIN}
                  onClick={scrollToTop}
                >
                  Log In
                </Link>
              )}
            </NavItem>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                {TOP_NAV_MENU.map((menu, i) => (
                  <Fragment key={i}>
                    {menu.target ? (
                      <NavItem key={i}>
                        <a
                          className={`nav-link`}
                          href={menu.to}
                          target={menu.target}
                        >
                          {menu.label}
                        </a>
                      </NavItem>
                    ) : (
                      <NavItem key={i}>
                        <Link
                          className={`nav-link`}
                          to={menu.to}
                          onClick={itemClick}
                        >
                          {menu.label}
                        </Link>
                      </NavItem>
                    )}
                  </Fragment>
                ))}
              </ul>
              <div className="d-flex color-change">
                <NavItem>
                  {isLoggedIn ? (
                    <span className="nav-link pointer" onClick={logoutHandler}>
                      Logout
                    </span>
                  ) : (
                    <Link
                      className="nav-link"
                      to={ROUTES.LOGIN}
                      onClick={scrollToTop}
                    >
                      Log In / Sign Up
                    </Link>
                  )}
                </NavItem>
              </div>
            </div>
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <Offcanvas.Header closeButton onHide={() => setSideMenu(false)}>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {TOP_NAV_MENU.map((menu, i) => (
                  <Fragment key={i}>
                    {menu.target ? (
                      <NavItem key={i}>
                        <a
                          className={`nav-link mb-3`}
                          href={menu.to}
                          target={menu.target}
                        >
                          <img src={menu.icon} alt="menu" className="me-2" />
                          {menu.label}
                        </a>
                      </NavItem>
                    ) : (
                      <NavItem
                        key={i}
                        className={`mb-2 py-2 ${
                          pathname === menu.to
                            ? "public-sidebar-active-menu"
                            : ""
                        }`}
                      >
                        <Link
                          className={`nav-link`}
                          to={menu.to}
                          onClick={itemClick}
                        >
                          <img src={menu.icon} alt="menu" className="me-2" />
                          {menu.label}
                        </Link>
                      </NavItem>
                    )}
                  </Fragment>
                ))}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
};

export default Header;

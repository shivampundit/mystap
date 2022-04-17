import React, { useState } from "react";
// import cartIcon from "../../../../Assets/Dashboard/headerone.svg";
import user from "../../../../Assets/profile/user.png";
import { handleLogout } from "../../../../Redux/Actions/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavItem,
  DropdownButton,
  Dropdown,
  Offcanvas,
} from "react-bootstrap";
import "./style.scss";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROUTES } from "../../../../Router/routes";
import Logo from "../../Logo";
import { useSelector, useDispatch } from "react-redux";
import { scrollToTop } from "../../../../Helpers/utils";
import { SIDE_MENU } from "../../../../Constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sideMenu, setSideMenu] = useState(false);
  const userData = useSelector((state) => state.auth);
  const logoRoute =
    userData?.isPricesAdded && userData?.isProjectsAdded
      ? ROUTES.LEADS
      : ROUTES.APP;

  const logoutHandler = () => {
    setSideMenu(false);
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

  const itemClick = () => {
    setSideMenu(false);
    scrollToTop();
  };
  return (
    <div className="header dashboard-header">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Navbar expand="lg" expanded={sideMenu}>
              <Navbar.Toggle onClick={() => setSideMenu(true)}>
                <span className="navbar-toggler-icon"></span>
              </Navbar.Toggle>
              <Logo to={logoRoute} />

              <div
                className="collapse navbar-collapse justify-content-end interFont"
                id="navbarSupportedContent"
              >
                {userData?.planId?.price !== 0 ? "Pro" : ""}
                <div className="d-flex color-change">
                  <NavItem>
                    <div className="dash-head d-flex align-items-center interFont">
                      {/* <img src={cartIcon} alt="user pic" /> */}
                      {}
                      <DropdownButton
                        variant="outline-secondary"
                        title={
                          <div className="pull-left">
                            <img
                              className="thumbnail-image"
                              src={userData?.imageUrl?.thumbnail || user}
                              alt="user pic"
                            />
                          </div>
                        }
                        id="input-group-dropdown-1"
                      >
                        <Dropdown.Item
                          onClick={() => navigate(ROUTES.MY_PROFILE)}
                        >
                          <FontAwesomeIcon icon="user" className="me-3" />
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutHandler}>
                          <FontAwesomeIcon
                            icon="sign-out-alt"
                            className="me-3"
                          />
                          Logout
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </NavItem>
                </div>
              </div>
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="start"
              >
                <Offcanvas.Header closeButton onHide={() => setSideMenu(false)}>
                  <Offcanvas.Title
                    id="offcanvasNavbarLabel"
                    className="pointer"
                    onClick={() => {
                      itemClick();
                      navigate(ROUTES.MY_PROFILE);
                    }}
                  >
                    <div className="profile-content">
                      <div className="profile-images">
                        <img
                          src={userData?.imageUrl?.thumbnail || user}
                          alt="user pic"
                        />
                      </div>
                      <div className="profile-text">
                        <h2>{`${userData?.firstName} ${userData?.lastName}`}</h2>
                        <p>Designer</p>
                      </div>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {SIDE_MENU.map((menu, i) => (
                    <NavItem
                      key={i}
                      className={`mb-2 py-2 ${
                        pathname === menu.to ? "sidebar-active-menu" : ""
                      }`}
                    >
                      {menu?.target ? (
                        <a
                          href={menu.to}
                          className="nav-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={menu.icon} alt="menu" className="me-2" />
                          <span>{menu.label}</span>
                        </a>
                      ) : (
                        <Link
                          to={menu.to}
                          onClick={itemClick}
                          className="nav-link"
                        >
                          <img src={menu.icon} alt="menu" className="me-2" />
                          {menu.label}
                        </Link>
                      )}
                    </NavItem>
                  ))}
                  {/* <div className="profile-content menucart">
                    <div className="profile-text">
                      <div className="nav-item">
                        <Link className="nav-link mb-3" to="/">
                          Cart
                        </Link>
                      </div>
                      <div className="nav-item">
                        <Link className="nav-link mb-3" to="/">
                          Wishlist
                        </Link>
                      </div>
                    </div>
                  </div> */}
                  <div className="sidemenu-logout pointer">
                    <NavItem onClick={logoutHandler}>Logout</NavItem>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;

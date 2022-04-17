import React from "react";
import loginone from "../../../Assets/Login/loginone.svg";
import logintwo from "../../../Assets/Login/logintwo.svg";
import loginthree from "../../../Assets/Login/loginthree.svg";
import loginfour from "../../../Assets/Login/loginfour.svg";
import Testimonial from "../../../Components/Common/Testimonial";
import { Container, Row } from "react-bootstrap";
import LoginForm from "./loginForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { scrollToTop } from "../../../Helpers/utils";

const Login = (props) => {
  return (
    <div>
      <section className="banner-home login-banner">
        <Container>
          <Row>
            <div className="col-md-4 text-start">
              <div className="tab-home">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="login-form">
                      <h2 className="pb-4">Login</h2>
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center">
              <div className="register-now">
                <h2>On Registration, you can</h2>
                <div className="d-flex mt-3">
                  <div className="boxes">
                    <img alt="alt" src={loginone} />
                    <h2>
                      Reach your potential clients & get project enquiries
                    </h2>
                  </div>
                  <div className="boxes">
                    <img alt="alt" src={logintwo} />
                    <h2>Manage enquiries with built in lead management tool</h2>
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <div className="boxes">
                    <img alt="alt" src={loginthree} />
                    <h2>Avail discounts on Interior products</h2>
                  </div>
                  <div className="boxes">
                    <img alt="alt" src={loginfour} />
                    <h2>Access exclusive deals on our marketplace</h2>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>

      <Testimonial />

      <section className="any-question">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-start">
              <h2>Got any question ?</h2>
              <p>Our team will love to help you</p>
            </div>
            <div className="col-md-4 align-items-center justify-content-end d-flex text-end">
              <Link to={ROUTES.REQUEST} onClick={scrollToTop}>
                <button className="know-more">Request a Call back</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

import React from "react";
import arrow from "../../Assets/Pricing/arrow.svg";
import Testimonial from "../../Components/Common/Testimonial";

import { Link } from "react-router-dom";

import Faqs from "../../Components/Common/Faqs";
import PricingCards from "../../Components/Common/PricingCards";
import { ROUTES } from "../../Router/routes";
import { scrollToTop } from "../../Helpers/utils";

const Pricing = () => {
  return (
    <>
      <section className="pricing-banner mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-4">
              <div className="pricing-text">
                {/*<h2>Its Easy to Get Started with IDESIGN MARKET</h2>*/}
                <h2>Its Easy to Get Started with IDESIGN MARKET</h2>
                  <p>Create your Profile and get connected to potential clients</p>
                {/*<ul>*/}
                  {/*<li>Profile Listing </li>*/}
                  {/*<li>Brand Offers </li>*/}
                  {/*<li>Business Tools </li>*/}
                {/*</ul>*/}
                <Link to="/profile-build">
                  <button className="know-more">Start Now</button>
                </Link>
                <span>IT’S FREE</span>
                <img src={arrow} className="arrow-price" alt="arrow" />
              </div>
              <div className="or">
                <span>OR</span>
              </div>
              <div className="headeing">
                <h2>Go Premium. Get assured enquiries</h2>
                <p>Boost your profile visiblity and grow your business</p>
              </div>
            </div>

            <PricingCards />
          </div>
        </div>
      </section>

      <Testimonial />

      <Faqs />

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
    </>
  );
};

export default Pricing;

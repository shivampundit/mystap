import React from "react";
import product from "../../Assets/Product/product-banner.svg";
import one from "../../Assets/Product/listingone.svg";
import three from "../../Assets/Product/listingthree.svg";
import four from "../../Assets/Product/listingfour.svg";
import five from "../../Assets/Product/listingfive.svg";
import lead from "../../Assets/Product/lead-manag.svg";
import leadone from "../../Assets/Product/leadone.svg";
import leadtwo from "../../Assets/Product/leadtwo.svg";
import leadthree from "../../Assets/Product/leadthree.svg";
import mobileone from "../../Assets/Product/mobileone.svg";
import mobiletwo from "../../Assets/Product/mobiletwo.svg";
import mobilethree from "../../Assets/Product/mobilethree.svg";
import mobilefour from "../../Assets/Product/mobilefour.svg";
import phone from "../../Assets/Product/phone.svg";
import google from "../../Assets/Product/apple.svg";
import apple from "../../Assets/Product/google.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router/routes";
import { scrollToTop } from "../../Helpers/utils";
import { SCROLL_SECTIONS } from "../../Constants/enums";

const Products = () => {
  return (
    <>
      <section className="product pt-4 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="product-banner">
                <h2>Bring your Ideas to Life</h2>
                <p>
                  Connect with potential clients and manage projects on the go
                  {/*Browse these product categories you will be <br /> able to use*/}
                  {/*from IDESIGN MARKET Platform.*/}
                </p>
                <Link to={ROUTES.LOGIN} onClick={scrollToTop}>
                  <button className="know-more">Get Started</button>
                </Link>
                <div className="product-img">
                  <img alt="alt" src={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="busines-product design-advantage mb-5 pb-5"
        id={SCROLL_SECTIONS.DESIGN}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="headeing mb-5">
                <h6>#IDesignListing</h6>
                <h2 className="mt-2">
                  Build your brand & give your business a <br /> Competitive
                  Advantage
                </h2>
              </div>
              <div className="d-flex">
                <div className="boxes">
                  <img alt="alt" src={one} />
                  <h2>
                    <span>Add and Manage</span> your leads at no cost
                  </h2>
                </div>
                <div className="boxes">
                  <img alt="alt" src={five} />
                  <h2>
                    <span> Target the projects </span> and locations you want
                    most
                  </h2>
                </div>
                <div className="boxes">
                  <img alt="alt" src={three} />
                  <h2>
                    <span> Showcase your business </span> in the IDESIGN MARKET
                    directory
                  </h2>
                </div>
                <div className="boxes">
                  <img alt="alt" src={four} />
                  <h2>
                    Highlight what makes your<span> business unique </span>
                  </h2>
                </div>
                <div className="boxes">
                  <img alt="alt" src={five} />
                  <h2>
                    Reach<span> homeowners looking to hire </span> on our
                    platform
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="busines-product leadmanagement mb-5 pb-5"
        id={SCROLL_SECTIONS.CRM}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-start mb-5">
              <div className="headeing">
                <h6>#Lead Management</h6>
                <h2 className="mt-2">
                  Stay on top of projects with a simple, powerful dashboard
                </h2>
              </div>
            </div>
            <div className="col-md-6">
              <div className="lead-mange mt-3">
                <img alt="alt" src={lead} />
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex">
                <div className="boxes text-center">
                  <img alt="alt" src={leadone} />
                  <h2>
                    Get<span> powerful insights </span> on business performance
                  </h2>
                </div>
                <div className="boxes text-center">
                  <img alt="alt" src={leadtwo} />
                  <h2>
                    Reach <span> homeowners looking </span> to hire on our
                    platform
                  </h2>
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="boxes text-center">
                  <img alt="alt" src={leadthree} />
                  <h2>
                    Stay<span> organized with clients, </span> & manage your
                    project
                  </h2>
                </div>
                <div className="boxes text-center">
                  <img alt="alt" src={leadone} />
                  <h2>
                    <span> Drives more </span> business through better
                    follow-up's
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-app mb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-start">
              <div className="headeing">
                <h6>#MobileApp</h6>
                <h2 className="mt-2">
                  Manage leads, source products and more on the go
                </h2>
                <Link to={ROUTES.LOGIN} onClick={scrollToTop}>
                  <button className="know-more mt-2">Get Started</button>
                </Link>
              </div>
              <div className="boxes d-flex mt-4 text-start justify-content-start align-items-center">
                <img alt="alt" src={mobileone} />
                <h2>
                  <span> Marketing Solution: </span> Build your brand & give
                  your business a competitive advantage
                </h2>
              </div>
              <div className="boxes d-flex text-start justify-content-start align-items-center">
                <img alt="alt" src={mobiletwo} />
                <h2>
                  <span> CRM: </span> Just tap to follow-up on any lead
                </h2>
              </div>
              <div className="boxes d-flex text-start justify-content-start align-items-center">
                <img alt="alt" src={mobilethree} />
                <h2>
                  <span> Marketplace </span> at your fingertips
                </h2>
              </div>
              <div className="boxes d-flex text-start justify-content-start align-items-center">
                <img alt="alt" src={mobilefour} />
                <h2>
                  <span> Brand Offers: </span> Shop interior brands,
                  <br /> avail offer and get rewards
                </h2>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center flex-column">
              <div className="phone-photo">
                <img alt="alt" src={phone} />
              </div>
              <div className="both-img mt-5">
                <img alt="alt" src={google} />
                <img alt="alt" src={apple} />
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default Products;

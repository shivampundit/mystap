import React from "react";
import Testimonial from "../../Components/Common/Testimonial";
import banner from "../../Assets/Landing/home-banner.png";
import designone from "../../Assets/Landing/designone.svg";
import designtwo from "../../Assets/Landing/designtwo.svg";
import designthree from "../../Assets/Landing/designthree.svg";
import designfour from "../../Assets/Landing/designfour.svg";
import designfive from "../../Assets/Landing/designfive.svg";
import designsix from "../../Assets/Landing/designtwo.svg";
import listing from "../../Assets/Landing/listing-Image.png";
import crm from "../../Assets/Landing/crm-image.png";
import app from "../../Assets/Landing/app-image.png";
import brand from "../../Assets/Landing/brand-Image.svg";
import google from "../../Assets/Landing/apple.png";
import apple from "../../Assets/Landing/app.png";
import mobileone from "../../Assets/Landing/mobileone.png";
import mobiletwo from "../../Assets/Landing/mobiletwo.png";
import LoginForm from "../Auth/Login/loginForm";
import { ROUTES } from "../../Router/routes";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../Helpers/utils";
import PricingCards from "../../Components/Common/PricingCards";
import { SCROLL_SECTIONS } from "../../Constants/enums";
import { HashLink } from "react-router-hash-link";

const Home = () => {
  return (
    <>
      <section className="banner-home">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-start">
              <div className="banner-left">
                <h2>Create your Free iDesign Pro Listing</h2>
                <p>
                  Attract and reach more client. Grow your business. Manage
                  Leads
                </p>
              </div>

              <div className="tab-home">
                <LoginForm />
              </div>
            </div>
            <div className="col-md-8 tet-start">
              <div className="banner-img">
                <img alt="alt" src={banner} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="desihn-profasional mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0 text-center">
              <div className="headeing">
                <h2>Made only for Design Professionals</h2>
                <p>
                  IDESIGN MARKET exclusive benefits for design professionals
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="design-box">
                <img alt="alt" src={designone} />
                <h2>Build your brand</h2>
                <p>
                  Get free listing and enhance visibility <br />
                  to millions of Homeowners
                </p>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div className="design-box">
                <img alt="alt" src={designtwo} />
                <h2>Generate & manage leads</h2>
                <p>
                  Get Business Leads and increase <br /> your business
                </p>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div className="design-box">
                <img alt="alt" src={designthree} />
                <h2>Source products</h2>
                <p>
                  Buy at wholesale prices from the
                  <br /> marketplace
                </p>
              </div>
            </div>

            <div className="col-md-4 mt-3 text-center">
              <div className="design-box">
                <img alt="alt" src={designfour} />
                <h2>Avail brand offers</h2>
                <p>
                  Avail exclusive discounts on Interior
                  <br /> Products for your clients
                </p>
              </div>
            </div>

            <div className="col-md-4 mt-3 text-center">
              <div className="design-box">
                <img alt="alt" src={designfive} />
                <h2>BOQ Assistance</h2>
                <p>
                  Book a slot with our Commercial team and
                  <br /> take advisory on your Project BOQ
                </p>
              </div>
            </div>

            <div className="col-md-4 mt-3 text-center">
              <div className="design-box">
                <img alt="alt" src={designsix} />
                <h2>Resources</h2>
                <p>
                  Access and download Material Rates,
                  <br /> specifications, Vendor Rates etc
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="design-listing mt-5 mb-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mt-5 pt-4">
              <div className="listing-left text-start">
                <h3>#IDesignListing</h3>
                <h2>
                  List your business & get access to unlimited project queries
                </h2>
                <p className="mt-4">
                  Showcase your projects, reach more homeowners, and grow your
                  business with IDESIGN MARKET listing.
                </p>
                <HashLink to={`${ROUTES.PRODUCTS}#${SCROLL_SECTIONS.DESIGN}`}>
                  <button className="know-more mt-3">Know More</button>
                </HashLink>
              </div>
            </div>
            <div className="col-md-7">
              <div className="listing-right">
                <img alt="alt" src={listing} className="desktop-img" />
                <img alt="alt" src={mobileone} className="mobile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="design-listing crm mt-5  pt-5">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-md-5 mt-5 pt-4">
              <div className="listing-left text-start">
                <h3>#CRM</h3>
                <h2>
                  Stay on top of your Leads with a simple & powerful dashboard
                </h2>
                <p className="mt-4">
                  Connect instantly with project queries and manage leads,
                  schedule meetings. All in a click!
                </p>
                <HashLink to={`${ROUTES.PRODUCTS}#${SCROLL_SECTIONS.CRM}`}>
                  <button className="know-more mt-3">Know More</button>
                </HashLink>
              </div>
            </div>
            <div className="col-md-7">
              <div className="listing-right">
                <img alt="alt" src={crm} className="desktop-img" />
                <img alt="alt" src={mobiletwo} className="mobile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="design-listing marketplace mt-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-5 mt-5 pt-4">
              <div className="listing-left text-start">
                <h3>#Marketplace</h3>
                <h2>A powerful interior marketplace at your fingertips</h2>
                <p className="mt-4">
                  Discover different styles of products, visualize the perfect
                  design and source product in just one click.
                </p>
                <button className="know-more mt-3">Know More</button>
              </div>
            </div>
            <div className="col-md-7 last-img-div">
              <div className="listing-right">
                <img alt="alt" src={brand} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="design-listing mobileapp mt-5 mb-5">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-md-5 mt-5 pt-4">
              <div className="listing-left text-start">
                <h3>#MobileApp</h3>
                <h2>Manage leads, source products & more on the go</h2>
                <p className="mt-4">
                  Everything you need to move your business forward - from
                  anywhere,manage leads, source products and more on the go
                </p>
                <img alt="alt" src={google} />
                <img alt="alt" src={apple} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="listing-right brand-img">
                <img alt="alt" src={app} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-offer mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>#BrandOffers</h3>
              <h2 className="mb-5">
                Shop interior brands, avail offer and get rewards
              </h2>

              <a href={ROUTES.BRAND_OFFERS} target="_blank" rel="noreferrer">
                <button className="brandExploreBtn">Explore</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="desihn-profasional eassy-start mt-5 pt-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="headeing text-center">
                <h2>Choose Premium. Get more Queries</h2>
                <p>
                  Choose one of of premium listing plans to get more enquiries
                </p>
              </div>
            </div>
          </div>

          <PricingCards />

          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="plan-text text-center">
                <span>Not sure about plans? Try our Free plan </span>
                <Link to={ROUTES.LOGIN} onClick={scrollToTop}>
                  <button className="know-more mt-5">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default Home;

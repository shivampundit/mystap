import React from "react";
import brandone from "../../../Assets/Dashboard/brandone.svg";
import brandtwo from "../../../Assets/Dashboard/brandtwo.svg";
import brandthree from "../../../Assets/Dashboard/brandthree.svg";
import brandfour from "../../../Assets/Dashboard/brandfour.svg";
import brandfive from "../../../Assets/Dashboard/brandfive.svg";
import brandsix from "../../../Assets/Dashboard/brandsix.svg";
import brandseven from "../../../Assets/Dashboard/brandseven.svg";
import brandeight from "../../../Assets/Dashboard/brandeight.svg";
import brandnine from "../../../Assets/Dashboard/brandnine.svg";
import brandten from "../../../Assets/Dashboard/brandten.svg";
import Dealfirst from "../../../Assets/Dashboard/dealImage1.png";
import DealThird from "../../../Assets/Dashboard/dealimage3.png";
import DealFour from "../../../Assets/Dashboard/dealImage4.png";
import dealIconFirst from "../../../Assets/Dashboard/dealIcon1.png";
import dealIconSecond from "../../../Assets/Dashboard/dealIcon2.png";
import dealIconThird from "../../../Assets/Dashboard/dealIcon3.png";
import dealIconFour from "../../../Assets/Dashboard/dealIcon4.png";
// import brandten from "../../../Assets/Dashboard/brandten.svg";

const Brand = () => {
  return (
    <>
      <section className="main-section brand-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start mb-2">
              <div className="brand-offer-dash">
                <h3> Brand Deals</h3>
                <p className="mt-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
              </div>
            </div>

            <div className="col-md-12 text-start mb-2">
              <div className="lead-plan">
                <h3> Categories</h3>
                <div className="city-status">
                  <button className="city-btns me-3">City</button>
                </div>
              </div>
            </div>

            <div className="col-md-12 text-start mt-4 mb-2">
              <div className="all-deal d-flex justify-content-between align-items-center">
                <div className="brand-box">
                  <img alt="alt" src={brandone} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandtwo} />
                  <h4>Upholstery</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandthree} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandfour} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandfive} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandsix} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandseven} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandeight} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandnine} />
                  <h4>All Deals</h4>
                  <h3>23</h3>
                </div>
                <div className="brand-box">
                  <img alt="alt" src={brandten} />
                  <h4>All Deals</h4>
                  <h3>230</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="main_deals">
            <h3 className="pb-2">All Deals (230)</h3>
            <div className="row">
              <div className="col-md-5">
                <div className="deal_image">
                  <img alt="alt" src={Dealfirst} />
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex">
                  <div>
                    <img alt="alt" className="dealIcon1" src={dealIconFirst} />
                  </div>
                  <div>
                    <h6>D-Decor</h6>
                    <span className="ps-2">Upholstery</span>
                  </div>
                </div>
                <div>
                  <p>
                    D'Decor Home Fabrics Pvt. Ltd., is a producer of curtain and
                    upholstery<br></br> fabrics. Their products are designed by
                    in-house, and are also being used by<br></br> designers and
                    furniture-makers in both Europe & USA
                  </p>
                  <div className="d-flex Custom_startIcon">
                    <span
                      className="fa fa-star checked
                    "></span>
                    <span
                      className="fa fa-star checked
                    "></span>
                    <span
                      className="fa fa-star checked
                    "></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "></span>
                  </div>
                  <button>View All 21 Deals</button>
                </div>
              </div>
            </div>
          </div>
          <div className="main_deals">
            <div className="row">
              <div className="col-md-5">
                <div className="deal_image">
                  <img alt="alt" src={DealFour} />
                  <h4>15 % off<br /> on fabric</h4>
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex">
                  <div>
                    <img alt="alt" className="dealIcon1" src={dealIconSecond} />
                  </div>
                  <div>
                    <h6>Diyas Lighting</h6>
                    <span className="ps-2">Lighting Wall Fixtures</span>
                  </div>
                </div>
                <div>
                  <p>
                    D'Decor Home Fabrics Pvt. Ltd., is a producer of curtain and
                    upholstery<br></br> fabrics. Their products are designed by
                    in-house, and are also being used by<br></br> designers and
                    furniture-makers in both Europe & USA
                  </p>
                  <div className="d-flex Custom_startIcon">
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                  </div>
                  <button>View All 4 Deals</button>
                </div>
              </div>
            </div>
          </div>
          <div className="main_deals">
            <div className="row">
              <div className="col-md-5">
                <div className="deal_image">
                  <img alt="alt" src={DealThird} />
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex">
                  <div>
                    <img alt="alt" className="dealIcon1" src={dealIconThird} />
                  </div>
                  <div>
                    <h6>pepperfry</h6>
                    <span className="ps-2">Furniture Decor</span>
                  </div>
                </div>
                <div>
                  <p>
                    D'Decor Home Fabrics Pvt. Ltd., is a producer of curtain and
                    upholstery<br></br> fabrics. Their products are designed by
                    in-house, and are also being used by<br></br> designers and
                    furniture-makers in both Europe & USA
                  </p>
                  <div className="d-flex Custom_startIcon">
                    <span className="fa fa-star checked"></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                  </div>
                  <button>View All 45 Deals</button>
                </div>
              </div>
            </div>
          </div>
          <div className="main_deals">
            <div className="row">
              <div className="col-md-5">
                <div className="deal_image">
                  <img alt="alt" src={DealFour} />
                </div>
              </div>
              <div className="col-md-7">
                <div className="d-flex">
                  <div>
                    <img alt="alt" className="dealIcon1" src={dealIconFour} />
                  </div>
                  <div>
                    <h6>Ikea</h6>
                    <span className="ps-2">Furniture Decor Home Services</span>
                  </div>
                </div>
                <div>
                  <p>
                    D'Decor Home Fabrics Pvt. Ltd., is a producer of curtain and
                    upholstery<br></br> fabrics. Their products are designed by
                    in-house, and are also being used by<br></br> designers and
                    furniture-makers in both Europe & USA
                  </p>
                  <div className="d-flex Custom_startIcon">
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                    <span
                      className="fa fa-star checked
                    "
                    ></span>
                  </div>
                  <button>View All 45 Deals</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brand;

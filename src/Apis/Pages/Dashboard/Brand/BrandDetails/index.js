import React from "react";
import arrow from "../../../../Assets/Dashboard/arrow.png";
import direction from "../../../../Assets/Dashboard/locationmap.svg";
import detailimg from "../../../../Assets/Dashboard/detailimg.png";
import dealss from "../../../../Assets/Dashboard/dealsss.png";

const BrandDetails = () => {
  return (
    <>
      <section className="main-section brand-page brand-details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start mb-2">
              <div className="brand-offer-dash d-flex align-items-center">
                  <img alt="alt" src={arrow} className="me-3" />
                <h3 className="mb-0"> Asian Paints</h3>
              </div>
            </div>

            <div className="col-md-4">
                <div className="address-section mt-4">
                    <div className="addres-markit d-flex mb-3">
                        <h4>Address: </h4>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>

                    <div className="addres-markit d-flex mb-3">
                        <h4>Market:  </h4>
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                    <button className="direction-btn mb-3"> <img alt="alt" src={direction} className="me-2" /> Directions</button>
                    <button className="direction-btn transprnt"> Contact</button>
                </div>
            </div>

            <div className="col-md-4 mt-4">
                <div className="imgs-details-brand">
                    <img alt="alt" src={detailimg} />
                </div>
            </div>

            <div className="col-md-4 mt-4">
                <div className="imgs-details-brand">
                    <img alt="alt" src={detailimg} />
                </div>
            </div>

          </div>
          
          <div className="row">
              <div className="col-md-12 mt-5 mb-4">
                <div className="all-deal-details">
                    <h2>All Deals</h2>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <div className="deals-sectionss">
                      <img alt="alt" src={dealss} />
                  </div>
              </div>


              <div className="col-md-12 mt-3 mb-4">
                <div className="all-deal-details">
                    <h2>Review</h2>
                </div>
                <div className="reviwe-div">
                    <h6>Write a Review</h6>
                    <div className="review-form">
                        <div className="reivew-group d-flex mt-3 mb-4">
                            <label>Star Rating</label>
                            <div className="d-flex Custom_startIcon">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                            </div>
                        </div>

                        <div className="reivew-group d-flex mb-4">
                            <label>Add a title</label>
                           <input type="text" />
                        </div>

                        <div className="reivew-group textarea-group mb-4">
                            <label>Written review</label>
                            <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                        </div>

                        <div className="text-center">
                        <button className="btn know-more place-submit"> Submit</button>
                        </div>
                    </div>
                </div>
              </div>

              <div className="col-md-12 mt-3 mb-4">
                  <div className="reviwe-others mb-4">
                      <h3>Reviews by other homeowners (40)</h3>
                  </div>
                  <div className="reviwe-discription pt-3">
                      <div className="img-text-reivew d-flex">
                          <span>P</span>
                          <div className="reviwe-text">
                              <h3>Reliable And Dependable Firm</h3>
                              <p>Review given by Parismita -  Client</p>
                          </div>
                      </div>
                      <p className="reviwe-p">We engaged Forefront after interviewing quite a few interior designers as we were not sure at the time how the renovation for our new 5 room BTO flat should be done Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..... Read More</p>
                  </div>

                  <div className="reviwe-discription pt-4">
                      <div className="img-text-reivew d-flex">
                          <span>P</span>
                          <div className="reviwe-text">
                              <h3>Reliable And Dependable Firm</h3>
                              <p>Review given by Parismita -  Client</p>
                          </div>
                      </div>
                      <p className="reviwe-p">We engaged ot sure at the time how the renovation for our new 5 room BTO flat should be done Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..... Read More</p>
                  </div>


                  <div className="reviwe-discription pt-4">
                      <div className="img-text-reivew d-flex">
                          <span>P</span>
                          <div className="reviwe-text">
                              <h3>Reliable And Dependable Firm</h3>
                              <p>Review given by Parismita -  Client</p>
                          </div>
                      </div>
                      <p className="reviwe-p">We engaged Forefront signers as w the renovation for our new 5 room BTO flat should be done Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..... Read More</p>
                  </div>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandDetails;

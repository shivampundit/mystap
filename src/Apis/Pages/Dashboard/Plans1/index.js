import React, { useState, useEffect } from "react";
import { getPlans } from "../../../Apis";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";

const ListingPlan = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getPlans().then((response) => setPlans(response?.data));
  }, []);

  const freePlan = () => {
    navigate(ROUTES.LEADS, { replace: true });
  };

  const buyPlan = () => {
    navigate(`${ROUTES.CHECKOUT}/${plans[selectedIndex]?._id}`);
  };

  return (
    <>
      <section className="main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start mb-2">
              <div className="lead-plan">
                <h3>Premium Listing Plan</h3>
              </div>
            </div>

            <div className="col-md-8">
              <h4 className="get-inquies">
                Maximise your visibility on IDESIGN MARKET to get more project
                enquiries
              </h4>

              <div className="row">
                {plans.map((plan, i) => (
                  <div
                    className="col-md-4 pointer"
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                  >
                    <div
                      className={`premiumListingPlanCard  ${
                        selectedIndex === i ? "activePremiumPlanCard" : ""
                      }`}
                    >
                      <h4>{`${plan?.name}`}</h4>
                      <h5 className="">
                        {`₹ ${plan?.price}/`}
                        <span>month</span>
                      </h5>
                      <ul className="plan-ul">
                        <li>Min 4 Projects Enquiries/ month</li>
                        <li>Unlimited Access to Project Enquiries</li>
                        <li>
                          Monthly Exclusive Articles on IDESIGN MARKET Magazine
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="lead-plans-later">
                Dont worry, you can add lead plans later also at any time
              </h5>
              <hr />
              <h5 className="lead-plans-later mb-0">
                <strong>Not sure about which plan to choose ? </strong> Start
                with our Basic Plan
              </h5>
              <h5 className="lead-plans-later mt-0 pb-0">
                Profile Listings. Brand Offers. Business Tools
                <span> It’s Free !! </span>
              </h5>

              <button
                className="know-more Continue-btn mt-4"
                onClick={freePlan}
              >
                Continue Free
              </button>
            </div>

            {!!plans.length && (
              <div className="col-md-4">
                <div className="dash-plan right-dash-plan">
                  <h4>{plans[selectedIndex]?.name}</h4>
                  <h5 className="">Benefits</h5>
                  <ul className="plan-ul">
                    <li>Min 4 Projects Enquiries/ month</li>
                    <li>Unlimited Access to Project Enquiries</li>
                    <li>Monthly Exclusive Articles on IDESIGN MARKET Magazine</li>
                  </ul>
                  <h6>{`3 Months Plan ₹${plans[selectedIndex]?.price} per month — Paid quaterly`}</h6>
                  <div className="total-cost d-flex justify-content-between mt-4">
                    <h5 className="">Total Cost</h5>
                    <h3 className="">{`₹ ${
                      plans[selectedIndex]?.duration *
                      plans[selectedIndex]?.price
                    }`}</h3>
                  </div>
                  <button className="know-more mt-4" onClick={buyPlan}>
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingPlan;

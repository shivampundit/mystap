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

  const buyPlan = (index) => {
    navigate(`${ROUTES.CHECKOUT}/${plans[index]?._id}`);
  };

  return (
    <>
      <section className="main-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center mb-5">
              <div className="lead-plan">
                <h3>
                  Thank you for completing your profile,{" "}
                  <span>your listing has been created </span>
                </h3>

                <button className="know-more mt-4" onClick={freePlan}>
                  Continue with Free Plan
                </button>
              </div>
            </div>

            <hr />
            <div className="col-md-9 mt-3 text-center">
              {/*<h4 className="get-inquies">*/}
              {/*Maximise your visibility on IDESIGN MARKET to get more project*/}
              {/*enquiries*/}
              {/*</h4>*/}
              <div className="prieum-text">
                <h3>Go Premium. Get more Project Enquiries </h3>
                <p>Choose one of our easy plan & Create higher visibility</p>
              </div>
              <div className="row pt-3">
                {plans.map((plan, i) => (
                  <div
                    className="col-md-4 text-start pointer"
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
                      <button className="know-more" onClick={()=>buyPlan(i)}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="lead-plans-later">
                <span>Pro Tip:</span> Connect with more customers to increase
                your conversion. Average conversion rate in the industry is
                around 15 %
              </h5>
            </div>

            {/*{!!plans.length && (*/}
            {/*<div className="col-md-4">*/}
            {/*<div className="dash-plan right-dash-plan">*/}
            {/*<h4>{plans[selectedIndex]?.name}</h4>*/}
            {/*<h5 className="">Benefits</h5>*/}
            {/*<ul className="plan-ul">*/}
            {/*<li>Min 4 Projects Enquiries/ month</li>*/}
            {/*<li>Unlimited Access to Project Enquiries</li>*/}
            {/*<li>Monthly Exclusive Articles on IDESIGN MARKET Magazine</li>*/}
            {/*</ul>*/}
            {/*<h6>{`3 Months Plan ₹${plans[selectedIndex]?.price} per month — Paid quaterly`}</h6>*/}
            {/*<div className="total-cost d-flex justify-content-between mt-4">*/}
            {/*<h5 className="">Total Cost</h5>*/}
            {/*<h3 className="">{`₹ ${*/}
            {/*plans[selectedIndex]?.duration **/}
            {/*plans[selectedIndex]?.price*/}
            {/*}`}</h3>*/}
            {/*</div>*/}

            {/*</div>*/}
            {/*</div>*/}
            {/*)}*/}
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingPlan;

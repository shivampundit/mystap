import React, { useState, useEffect } from "react";
import LeadPlans from "../Leads/leadPlans";
import { getPlans, getUserProfile } from "../../../Apis";
import plan from "../../../Assets/Dashboard/planbanner.png";
import { ROUTES } from "../../../Router/routes";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const GoPremium = () => {
  const [plans, setPlans] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getPlans().then((res) => setPlans(res?.data));
    getUserProfile().then((res) => setUserData(res?.data));
  }, []);

  return (
    <section className="main-section">
      <div className="container-fluid">
        {userData?.planId?.price !== 0 ? (
          <div className="row">
            <div className="col-md-12 mb-5">
              <div className="lead-plan actiplan">
                <h3 className="mb-0">Your Active Plan</h3>
                <p>Choose one of our easy plan & Create higher visibility </p>
              </div>
              <div className="checkout-content d-flex  justify-content-between">
                <div className="checkout-img-text d-flex">
                  <div className="checkout-img">
                    <img
                      src={userData?.planId?.imageUrl?.original || plan}
                      alt="icon"
                    />
                  </div>
                  <div className="checkout-text">
                    <div className="dash-plan ps-5">
                      <h4>{userData?.planId?.name}</h4>

                      <ul className="plan-ul">
                        {(userData?.planId?.features || []).map(
                          (feature, i) => (
                            <li key={i}>{feature}</li>
                          )
                        )}
                      </ul>
                      {/* <h5 className="mt-3 mb-3">
                        {`₹ ${userData?.planId?.price}/`}
                        <span>month</span>
                      </h5> */}
                      <Link to={ROUTES.PLANS}>
                        <button className="change-plan btn">
                          Upgrade Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="checkout-text billing-right">
                  <div className="dash-plan ps-5">
                    <h4>Billing</h4>

                    <ul className="plan-ul">
                      <li>
                        <FontAwesomeIcon icon="calendar-day" />{" "}
                        {`₹ ${userData?.planId?.price}/`}
                        <span>month</span>
                      </li>
                      <li>{`Service Will expire on ${moment(
                        userData?.planBuyDate || new Date()
                      )
                        .add(userData?.planId?.duration, "months")
                        .format("MMM DD, YYYY")}`}</li>
                      <li>{`${userData?.planId?.duration} Months Plan`}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <LeadPlans plans={plans} />
      </div>
    </section>
  );
};

export default GoPremium;

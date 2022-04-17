import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Router/routes";

const PlanCard = ({
  name = "",
  price = "",
  duration = "",
  features = [],
  variant = 0,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div
        className={`dash-plan ${
          variant === 1
            ? "color-plan"
            : variant === 2
            ? "color-plan-change"
            : ""
        }`}
      >
        <h4>{name}</h4>
        <h5 className="">
          {`₹ ${price}/`}
          <span>month</span>
        </h5>
        <ul className="plan-ul">
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <Link to={ROUTES.PLANS}>
          <button className="btn know-more">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;

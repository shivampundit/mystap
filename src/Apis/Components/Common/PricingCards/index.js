import React, { useEffect, useState } from "react";
import planuser from "../../../Assets/Landing/plan-user.svg";
import horn from "../../../Assets/Landing/horn.svg";
import planone from "../../../Assets/Landing/planone.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { scrollToTop } from "../../../Helpers/utils";
import { getPlans } from "../../../Apis";
import Slider from "react-slick";

const PricingCards = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getPlans().then((res) => setPlans(res?.data));
  }, []);

  const getImage = (index) => {
    switch (index) {
      case 0:
        return <img alt="alt" src={planone} className="planone" />;
      case 1:
        return <img src={planuser} className="plan-user" alt="" />;
      case 2:
        return <img src={horn} className="horn" alt="" />;
      default:
        return null;
    }
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          autoplay: true,
          slickGoTo: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings} className="row justify-content-around pt-2">
        {plans.map((plan, i) => (
          <div className="months-plans justify-content-around d-flex pt-5 mt-3" key={i}>
          <div className="col-md-8 position-relative">
            {getImage(i)}
            <div className={`plan ${i === 1 ? "blue" : ""}`}>
              <h2>{plan?.name}</h2>
              <div className="plan-body">
                <h3>
                  {`₹ ${plan?.price}/`}
                  <span>month</span>
                </h3>
                <p>{plan?.description}</p>
                <ul>
                  {plan?.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="get-started">
                  <Link to={ROUTES.LOGIN} onClick={scrollToTop}>
                    <button className="know-more">Get Started</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PricingCards;

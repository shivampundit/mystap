import React from "react";
import PlanCard from "../../../Components/Cards/planCard";
import { Row } from "react-bootstrap";
/*let settings = {
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
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        autoplay: true,
        slickGoTo: 1,
      },
    },
  ],
};*/
const LeadPlans = ({ plans = [] }) => {
  if (!plans.length) {
    return null;
  }
  return (
    <Row>
      <div className="col-md-12 text-start mb-2">
        <div className="lead-plan">
          <h3>Go Premium. Get more Project Enquiries</h3>
          <p>Choose one of our easy plan & Create higher visibility </p>
        </div>
      </div>

      <div className="text-start">
        <div className="row justify-content-around pt-2">
          {/* <Slider {...settings} className="row justify-content-around pt-2"> */}
          {plans.map((plan, i) => (
            <PlanCard key={i} {...plan} variant={i} />
          ))}
          {/* </Slider> */}
        </div>
      </div>
    </Row>
  );
};

export default LeadPlans;

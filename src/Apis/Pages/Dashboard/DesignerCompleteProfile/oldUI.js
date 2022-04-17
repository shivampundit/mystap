import React, { useState } from "react";
import zoom from "../../../Assets/Dashboard/zoom.svg";
import fee from "../../../Assets/Dashboard/fee.svg";
import tickgreen from "../../../Assets/Dashboard/tickgreen.svg";
import tickblack from "../../../Assets/Dashboard/tickblack.svg";
import { useNavigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import { updateUserProfile } from "../../../Apis";
import { ROUTES } from "../../../Router/routes";
import { useDispatch } from "react-redux";
import { completeProfile } from "../../../Redux/Actions/auth";
import { DESIGNER_FEE_STEP } from "../../../Constants/enums";
import ProgressBar from "../../../Components/ProgressBar";

const fields = {
  [DESIGNER_FEE_STEP.STEP1]: [
    {
      title: "Zoom Consultation",
      desc:
        " Would you like to earn money from zoom consultation? What will you charge per hour of your consultation?",
      link: "/know-more",
      name: "zoomPrice",
      image: zoom,
      priceType: "/Hour",
    },
    {
      title: "Design Fee / Room",
      desc: "Charge Design Fees per room  to attract maximum clients.",
      link: "",
      name: "designRoomPrice",
      image: fee,
      priceType: "/Room",
    },
  ],
  [DESIGNER_FEE_STEP.STEP2]: [
    {
      title: "Design Fee by Area",
      desc:
        " Would you like to earn money from zoom consultation? What will you charge per hour of your consultation?",
      link: "/know-more",
      name: "designAreaPrice",
      image: zoom,
      priceType: "/Sqft",
    },
    {
      title: "Design Fee by percentage",
      desc:
        " Would you like to earn money from zoom consultation? What will you charge per hour of your consultation?",
      link: "/know-more",
      name: "designFeePercentage",
      image: zoom,
      priceType: "%",
    },
  ],
};

const DesignerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(DESIGNER_FEE_STEP.STEP1);
  const [fees, setFees] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const payload = new FormData();
    payload.append("fees", JSON.stringify(fees));
    updateUserProfile(payload).then((res) => {
      dispatch(completeProfile(res?.data));
      navigate(ROUTES.UPLOAD_PROJECT);
    });
  };

  const onChange = (e) => {
    setFees((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: !e.target.value }));
  };

  const nextHandler = () => {
    const keys = fields[step].map((field) => field.name);
    let isValid = true;
    for (let i = 0; i < keys.length; i++) {
      if (!fees[keys[i]]) {
        isValid = false;
        setErrors((prev) => ({ ...prev, [keys[i]]: !fees[keys[i]] }));
      }
    }
    if (isValid) {
      if (step === DESIGNER_FEE_STEP.STEP1) {
        setStep(DESIGNER_FEE_STEP.STEP2);
      } else {
        onSubmit();
      }
    }
  };

  return (
    <>
      <section className="main-section zoom-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start mb-4">
              <div className="dash-heading">
                <h3>Let’s make some money!</h3>
              </div>
            </div>
            <div className="justify-content-between d-flex ">
              <div className="col-md-9">
                <div>
                  {fields[step].map((field, i) => (
                    <div
                      className="zoom-cons justify-content-between d-flex mb-5"
                      key={`${i}-${step}`}
                    >
                      <div className="zoom-content">
                        <div className="zoom-text-img">
                          <img src={zoom} alt="pic" />
                          <h4>{field.title}</h4>
                        </div>
                        <p>{field.desc}</p>
                        <a href={field.link}>Know more</a>
                      </div>
                      <div className="zoom-input">
                        <span>INR</span>
                        <FormControl
                          type="number"
                          name={field.name}
                          value={fees[field.name]}
                          onChange={onChange}
                          isInvalid={!!errors?.[field.name]}
                          className="disableErrorIcon"
                        />
                        <span>{field.priceType}</span>
                      </div>
                    </div>
                  ))}
                  <div className="more mt-4 text-center">
                    {step === DESIGNER_FEE_STEP.STEP1 && (
                      <p>Wait, there’s more...</p>
                    )}
                    <button className="know-more" onClick={nextHandler}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div className="pe-0 ps-0 d-flex">
                <ProgressBar />
                <ul className="check-uncheck">
                  <li className="green">
                    <img src={tickgreen} alt="pic" />
                    Basic Details
                  </li>
                  <li>
                    <img src={tickblack} alt="pic" />
                    Make Some Money
                  </li>
                  <li>
                    <img src={tickblack} alt="pic" />
                    Upload Projects
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignerDashboard;

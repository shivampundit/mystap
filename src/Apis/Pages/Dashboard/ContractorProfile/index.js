import React, { useState, useRef } from "react";
import { FormControl } from "react-bootstrap";
import zoom from "../../../Assets/Dashboard/zoom.svg";
import contactorone from "../../../Assets/Dashboard/contactorone.svg";
import contactortwo from "../../../Assets/Dashboard/contactortwo.svg";
import kitchenone from "../../../Assets/Dashboard/kitchenone.svg";
import contactorthree from "../../../Assets/Dashboard/contactorthree.svg";
import fee from "../../../Assets/Dashboard/fee.svg";
import { updateUserProfile } from "../../../Apis";
import { completeProfile } from "../../../Redux/Actions/auth";
import { ROUTES } from "../../../Router/routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const FIELDS = {
  [STEPS.ONE]: {
    heading: "What Services Do You Provide?",
    image: zoom,
    title: "What is the minimum project Value you are willing to do?",
    subTitle: "Please mention your hourly consultation fees.",
    key: "zoomPrice",
    priceType: "/sqft",
    tip: "",
  },
  [STEPS.TWO]: {
    heading: "What Every Client wants to know",
    image: fee,
    title: "How much fees would you charge for designing per Sq.ft basis?",
    subTitle: "Provide your fees for Square Feet of Designed Area",
    key: "designAreaPrice",
    priceType: "/Sqft",
    tip:
      "Homeowners are 3 times more likely to choose design firms which give design fees.",
  },
  [STEPS.THREE]: {
    heading: "Over 50% Homeowners get 1-3 rooms designed",
    image: fee,
    title: "How much fees would you charge for designing a room?",
    subTitle: "Charge Design Fees per room to attract maximum clients.",
    key: "designRoomPrice",
    priceType: "/Room",
    tip:
      "Homeowners are 3 times more likely to choose design firms which give design fees.",
  },
};

const INFO = {
  [STEPS.ONE]: {
    title: "What are these Services we are talking about?",
    points: [
      "Connect to Homeowners looking for quick advice",
      "Mostly advisory service, no drawings to be provided.",
      "Meeting scheduled at mutual convenience.",
    ],
  },
  [STEPS.TWO]: {
    title: "How Does Fees per Sqft Work?",
    points: [
      "Provide a per sqft fees for all interior design services - including drawings, visits, 3Ds, GFCs etc",
      "Connect with Homeowners and provide Quotations and Explain Offerings",
    ],
  },
  [STEPS.THREE]: {
    title: "How Does Per Room Design Fee work?",
    points: [
      "Applicable for Apartments, Builder Floors or Bungalows only.",
      "Fee is charged irrespective of Room sizes upto 250 Sqft. Even Toilet or Balcony Design is charged on per room",
      "Easy to understand for homeowners and gets good response",
    ],
  },
};

const defaultValues = {
  zoomPrice: "",
  designAreaPrice: "",
  designRoomPrice: "",
};

const ContractorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.ONE);
  const [values, setValues] = useState(defaultValues);
  const [touched, setTouched] = useState();
  const inputRef = useRef();

  const onValueChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (!touched?.[e.target.name]) {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!values[FIELDS[step].key]) {
      setTouched((prev) => ({ ...prev, [FIELDS[step].key]: true }));
      inputRef.current?.focus();
    } else if (step !== STEPS.THREE && values[FIELDS[step].key]) {
      setStep((s) => s + 1);
    } else if (step === STEPS.THREE && values[FIELDS[step].key]) {
      const payload = new FormData();
      payload.append("fees", JSON.stringify(values));
      updateUserProfile(payload).then((res) => {
        dispatch(completeProfile(res?.data));
        navigate(ROUTES.UPLOAD_PROJECT, { replace: true });
      });
    }
  };

  const previousHandler = () => {
    if (step !== STEPS.ONE) {
      setStep((s) => s - 1);
    }
  };

  return (
    <section className="main-section zoom-profile step-two contactor-profiless">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 text-start mb-4">
            <div className="dash-heading">
              <span>Step 2 of 3</span>
              <h3>{FIELDS[step].heading}</h3>

              <div className="grate-div">
                {/* <img src={FIELDS[step].image} alt="pic" /> */}
                <h2 className="me-5 mb-3">{FIELDS[step].title}</h2>
                {/* <p>{FIELDS[step].subTitle}</p> */}

                {/* <div className="input-zoomss designfee d-flex justify-content-between">
                <p className="mb-0"></p>
                  <p className="red mb-0">* Fees Required</p>
                </div> */}

                <form id="hook-form" className="hook-rate" onSubmit={onSubmit}>
                  <div className="rate-boxs">
                    <p className="mb-0">Rate</p>
                    <div className="zoom-input">
                      {/* <span>INR</span> */}
                      <FormControl
                        type="number"
                        min={1}
                        ref={inputRef}
                        key={FIELDS[step].key}
                        name={FIELDS[step].key}
                        className="disableErrorIcon interFont"
                        onChange={onValueChange}
                        value={values?.[FIELDS[step].key]}
                        isInvalid={
                          touched?.[FIELDS[step].key] &&
                          !values?.[FIELDS[step].key]
                        }
                      />
                      <span>{FIELDS[step]?.priceType}</span>
                    </div>
                  </div>
                </form>
                {/* <div className="input-zoomss d-flex justify-content-between">
                  <p className="mt-3">
                    <span style={{ color: "#3B5998" }}>Pro Tip:</span>{" "}
                    Homeowners are 3 times more likely to choose design firms
                    which give design fees.
                  </p>
                </div> */}
              </div>

              <div className="grate-div box-bottoms">
                {/* <img src={FIELDS[step].image} alt="pic" /> */}
                <h2 className="me-5 mb-3">{FIELDS[step].title}</h2>
                {/* <p>{FIELDS[step].subTitle}</p> */}

                {/* <div className="input-zoomss designfee d-flex justify-content-between">
                  <p className="mb-0">Design Fee</p>
                  <p className="red mb-0">* Fees Required</p>
                </div> */}
                <form id="hook-form" onSubmit={onSubmit}>
                  <div className="rate-text">
                    <div className="d-flex align-items-center">
                      <img src={contactorone} alt="alt" />
                      <p>POP False Ceiling</p>
                    </div>
                    <div className="rate-boxs">
                      <p className="mb-0">Rate</p>
                      <div className="zoom-input">
                        {/* <span>INR</span> */}
                        <FormControl
                          type="number"
                          min={1}
                          ref={inputRef}
                          key={FIELDS[step].key}
                          name={FIELDS[step].key}
                          className="disableErrorIcon interFont"
                          onChange={onValueChange}
                          value={values?.[FIELDS[step].key]}
                          isInvalid={
                            touched?.[FIELDS[step].key] &&
                            !values?.[FIELDS[step].key]
                          }
                        />
                        <span>{FIELDS[step]?.priceType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rate-text mt-4 mb-4">
                    <div className="d-flex align-items-center">
                      <img src={contactortwo} alt="alt" />
                      <p>Fixing of 2 × 2 Tiles with Cement and Sand</p>
                    </div>
                    <div className="rate-boxs">
                      <p className="mb-0">Rate</p>
                      <div className="zoom-input">
                        {/* <span>INR</span> */}
                        <FormControl
                          type="number"
                          min={1}
                          ref={inputRef}
                          key={FIELDS[step].key}
                          name={FIELDS[step].key}
                          className="disableErrorIcon interFont"
                          onChange={onValueChange}
                          value={values?.[FIELDS[step].key]}
                          isInvalid={
                            touched?.[FIELDS[step].key] &&
                            !values?.[FIELDS[step].key]
                          }
                        />
                        <span>{FIELDS[step]?.priceType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rate-text">
                    <div className="d-flex align-items-center">
                      <img src={contactorthree} alt="alt" />
                      <p>Premium Plastic Emulsion with Putty</p>
                    </div>
                    <div className="rate-boxs">
                      <p className="mb-0">Rate</p>
                      <div className="zoom-input">
                        {/* <span>INR</span> */}
                        <FormControl
                          type="number"
                          min={1}
                          ref={inputRef}
                          key={FIELDS[step].key}
                          name={FIELDS[step].key}
                          className="disableErrorIcon interFont"
                          onChange={onValueChange}
                          value={values?.[FIELDS[step].key]}
                          isInvalid={
                            touched?.[FIELDS[step].key] &&
                            !values?.[FIELDS[step].key]
                          }
                        />
                        <span>{FIELDS[step]?.priceType}</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="grate-div box-bottoms products">
                {/* <img src={FIELDS[step].image} alt="pic" /> */}
                <h2 className="me-5 mb-3">{FIELDS[step].title}</h2>
                {/* <p>{FIELDS[step].subTitle}</p> */}

                {/* <div className="input-zoomss designfee d-flex justify-content-between">
                  <p className="mb-0">Design Fee</p>
                  <p className="red mb-0">* Fees Required</p>
                </div> */}
                <form id="hook-form" onSubmit={onSubmit}>
                  <div className="rate-text">
                    <div className="d-flex align-items-center">
                      <img src={kitchenone} alt="alt" />
                      <div className="celling-boxx">
                        <h5>POP False Ceiling</h5>
                        <p>
                          Pls quote prices on per sqft basis of the elevation -
                          front surface area Inner surfaces to be finished in
                          liner laminate
                        </p>

                        <div className="rate-boxs">
                          <p className="mb-0">High Gloss Laminated</p>
                          <div className="d-flex align-items-center">
                            <p className="mb-0">Rate</p>
                            <div className="zoom-input">
                              {/* <span>INR</span> */}
                              <FormControl
                                type="number"
                                min={1}
                                ref={inputRef}
                                key={FIELDS[step].key}
                                name={FIELDS[step].key}
                                className="disableErrorIcon interFont"
                                onChange={onValueChange}
                                value={values?.[FIELDS[step].key]}
                                isInvalid={
                                  touched?.[FIELDS[step].key] &&
                                  !values?.[FIELDS[step].key]
                                }
                              />
                              <span>{FIELDS[step]?.priceType}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="d-flex justify-content-between btn-pre-next">
                {step === STEPS.ONE ? (
                  <div></div>
                ) : (
                  <button
                    className="know-more btn-previous"
                    onClick={previousHandler}
                  >
                    Previous
                  </button>
                )}

                <button className="know-more" type="submit" form="hook-form">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-5 pt-4">
            <div className="dose-zoom mt-2">
              <h5>{INFO[step].title}</h5>
              <ul>
                {INFO[step].points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              {/* <p className="text-end stick-bott">
                Note : All prices exclusive of GST
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractorProfile;

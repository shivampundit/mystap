import React, { useState, useRef } from "react";
import { FormControl, FormLabel, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import zoom from "../../../Assets/Dashboard/zoom.svg";
import fee from "../../../Assets/Dashboard/fee.svg";
import { updateUserProfile } from "../../../Apis";
import { completeProfile } from "../../../Redux/Actions/auth";
import { ROUTES } from "../../../Router/routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./step2.css";
import UploadWardrobePhotos from "./UploadWardrobePhotos";
import UploadKitchenPhotos from "./UploadKitchenPhotos";

const STEPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const FIELDS = {
  [STEPS.ONE]: {
    heading: "What price do you charge for Wardrobe?",
    image: zoom,
    title: "Wardrobe price",
    subTitle:
      "Please mention your prices for wardrobe on per sqft basis of the elevation.",
    key: "zoomPrice",
    priceType: "per/sqft",
    tip: "",
  },
  [STEPS.TWO]: {
    heading: "What price do you charge for Kitchen?",
    image: fee,
    title: "Kitchen Price",
    subTitle:
      "Please mention your prices for kitchen on per sqft basis of the elevation",
    key: "designAreaPrice",
    priceType: "/Sqft",
    tip: "Homeowners are 3 times more likely to choose design firms which give design fees.",
  },
  [STEPS.THREE]: {
    heading: "Over 50% Homeowners get 1-3 rooms designed",
    image: fee,
    title: "How much fees would you charge for designing a room?",
    subTitle: "Charge Design Fees per room to attract maximum clients.",
    key: "designRoomPrice",
    priceType: "/Room",
    tip: "Homeowners are 3 times more likely to choose design firms which give design fees.",
  },
};

const INFO = {
  [STEPS.ONE]: {
    title: "How to Quote?",
    points: [
      "Quote price without GST, transportation, packaging and handles",
      "Inner surface to be finished with Liner Laminate 0.7 or 0.8 mm",
      "All hardware to be Hettich or Hafelle, soft close hinges and normal channels",
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

const DesignerCompleteProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.ONE);
  const [values, setValues] = useState(defaultValues);
  const [touched, setTouched] = useState();
  const inputRef = useRef();
  const [cardToShow, setCardToShow] = useState("wardrobe-card");

  const onValueChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (!touched?.[e.target.name]) {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(inputRef.current)
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
    <React.Fragment>
      {/* {cardToShow === "wardrobe-images-card" && <UploadWardrobePhotos />} */}
      {/* {cardToShow === "kitchen-images-card" && <UploadKitchenPhotos />} */}
      <UploadWardrobePhotos/>
      {!cardToShow === "wardrobe-card" && (
        <section className="main-section zoom-profile step-two">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 text-start mb-4">
                <div className="dash-heading">
                  <span className="d-flex justify-content-between">
                    <h3>{FIELDS[step].heading}</h3>
                    <span className="ms-5">Step 2/3</span>
                  </span>

                  <div className="grate-div" id="wardrobePriceCard">
                    {/* <img src={FIELDS[step].image} alt="pic" /> */}
                    <h2 className="me-5 mb-2">{FIELDS[step].title}</h2>
                    <p>{FIELDS[step].subTitle}</p>

                    {/* <div className="input-zoomss designfee d-flex justify-content-between">
                  <p className="mb-0">Design Fee</p>
                  <p className="red mb-0">* Fees Required</p>
                </div> */}
                    <Form
                      id="hook-form"
                      onSubmit={onSubmit}
                      style={{
                        // border: "2px solid red",
                        width: "auto",
                      }}
                    >
                      <div className="zoom-input my-3 d-flex align-items-center justify-content-between">
                        <FormLabel column sm="8" className="interFont">
                          Normal SF Laminated
                        </FormLabel>
                        {/* <span>INR</span> */}
                        <label htmlFor="rupeeSymbol" className="interFont">
                          ₹
                        </label>
                        <Col sm="3">
                          <div className="d-flex">
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
                            <label htmlFor="rupeeSymbol" className="interFont">
                              &nbsp;per/sqft
                            </label>
                          </div>
                        </Col>
                        {/* <span>{FIELDS[step]?.priceType}</span> */}
                      </div>
                      <div className="zoom-input my-3 d-flex align-items-center justify-content-between">
                        <FormLabel column sm="8" className="interFont">
                          High Gloss Laminated
                        </FormLabel>
                        <label htmlFor="rupeeSymbol" className="interFont">
                          ₹
                        </label>
                        <Col sm="3">
                          <div className="d-flex">
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
                            <label htmlFor="rupeeSymbol" className="interFont">
                              &nbsp;per/sqft
                            </label>
                          </div>
                        </Col>
                        {/* <span>{FIELDS[step]?.priceType}</span> */}
                      </div>
                      <div className="zoom-input my-3 d-flex align-items-center justify-content-between">
                        <FormLabel column sm="7" className="interFont">
                          How much price discounts do you offer to Architects &
                          Interiors
                        </FormLabel>
                        {/* <span>INR</span> */}

                        <Col sm="3">
                          <div className="d-flex">
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
                            <label htmlFor="rupeeSymbol" className="interFont">
                              &nbsp;%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                          </div>
                        </Col>
                        {/* <span>{FIELDS[step]?.priceType}</span> */}
                      </div>
                    </Form>
                    {/* <div className="input-zoomss d-flex justify-content-between">
                  <p className="mt-3">
                    <span style={{ color: "#3B5998" }}>Pro Tip:</span>{" "}
                    Homeowners are 3 times more likely to choose design firms
                    which give design fees.
                  </p>
                </div> */}
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

                    <button
                      className="know-more"
                      type="submit"
                      form="hook-form"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-5 mt-5">
                <div className="dose-zoom mt-2" id="howToQuoteCard">
                  <h5>{INFO[step].title}</h5>
                  <ul>
                    {INFO[step].points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  <p className="my-1 stick-bott" id="proTipSecondStep">
                    Pro Tip : Your prices will be seen by Homeowners. Give a
                    competitive price!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default DesignerCompleteProfile;

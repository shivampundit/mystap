import React from "react";
import Testimonial from "../../../Components/Common/Testimonial";
import mobileone from "../../../Assets/profile/mobileone.svg";
import build from "../../../Assets/Product/build.svg";
import genrate from "../../../Assets/Product/genrate.svg";
import bqq from "../../../Assets/Product/bqq.svg";
import { Link, Navigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { Form, Row, Col } from "react-bootstrap";
import FormInput from "../../../Components/Forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileBuildSchema } from "../../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { completeProfile } from "../../../Redux/Actions/auth";
import {
  SIGN_UP_TYPE,
  CITIES_DROPDOWN,
  WORK_EXPERIENCE_DROPDOWN,
} from "../../../Constants/enums";
import { updateUserProfile } from "../../../Apis";
import { toast } from "react-toastify";
import "./ProfileBuild.css";
const ProfileBuild = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const [type, setType] = useState(SIGN_UP_TYPE.DESIGNER);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { isWhatsapp: true },
    resolver: yupResolver(profileBuildSchema),
  });

  //redirect user to login if email, password is null
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("type", SIGN_UP_TYPE.DESIGNER);
    for (let key in data) {
      payload.append(key, data[key]);
    }
    updateUserProfile(payload).then((res) => {
      dispatch(completeProfile(res?.data));
      toast.success("Profile Updated!");
    });
  };

  return (
    <>
      <section className="banner-home profile-build">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-start">
              <div className="banner-left">
                <h2>Build Profile</h2>
                <p className="mb-0">
                  Complete your Free Profile in 3 Easy Steps
                </p>
              </div>
              <div className="tab-home">
                {/* <ul
                  className="nav nav-tabs"
                  id="myTab"
                  role="tablist"
                  style={{ width: "100%" }}
                >
                  {["Designer", "Contractor"].map((item, i) => (
                    <li className="nav-item" key={i} style={{ width: "50%" }}>
                      <button
                        className={`nav-link ${i + 1 === type ? "active" : ""}`}
                        style={{ width: "100%" }}
                        onClick={() => setType(i + 1)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul> */}

                <div className="login-form mt-3">
                  <h6>
                    These details will <span> appear on your listing.</span>
                  </h6>

                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <FormInput
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          register={register("firstName")}
                          isInvalid={!!errors?.["firstName"]}
                          error={errors?.["firstName"]?.message}
                        />
                      </Col>
                      <Col>
                        <FormInput
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          register={register("lastName")}
                          isInvalid={!!errors?.["lastName"]}
                          error={errors?.["lastName"]?.message}
                        />
                      </Col>
                    </Row>
                    <FormInput
                      name="phoneNumber"
                      type="text"
                      placeholder="Mobile Number"
                      register={register("phoneNumber")}
                      isInvalid={!!errors?.["phoneNumber"]}
                      error={errors?.["phoneNumber"]?.message}
                    />
                    <div className="form-group chechbox">
                      <input
                        type="checkbox"
                        name={"isWhatsapp"}
                        {...register("isWhatsapp")}
                      />
                      {"This is my Whatsapp Number."}
                    </div>
                    {!watch("isWhatsapp") && (
                      <FormInput
                        name="whatsappNumber"
                        type="text"
                        placeholder="Enter Whatsapp Number"
                        register={register("whatsappNumber")}
                        isInvalid={!!errors?.["whatsappNumber"]}
                        error={errors?.["whatsappNumber"]?.message}
                      />
                    )}

                    <FormInput
                      name="companyName"
                      type="text"
                      placeholder="Company Name"
                      register={register("companyName")}
                      isInvalid={!!errors?.["companyName"]}
                      error={errors?.["companyName"]?.message}
                    />

                    <Row>
                      <Col>
                        <FormInput
                          type="select"
                          name="city"
                          options={CITIES_DROPDOWN}
                          register={register("city")}
                          isInvalid={!!errors?.["city"]}
                          error={errors?.["city"]?.message}
                        />
                        {/* <FormInput
                          name="city"
                          type="text"
                          placeholder="City"
                          register={register("city")}
                          isInvalid={!!errors?.["city"]}
                          error={errors?.["city"]?.message}
                        /> */}
                      </Col>
                      <Col>
                        <FormInput
                          name="pinCode"
                          type="text"
                          placeholder="Pin Code"
                          register={register("pinCode")}
                          isInvalid={!!errors?.["pinCode"]}
                          error={errors?.["pinCode"]?.message}
                        />
                      </Col>
                    </Row>
                    <FormInput
                      type="select"
                      name="workExperience"
                      options={WORK_EXPERIENCE_DROPDOWN}
                      register={register("workExperience")}
                      isInvalid={!!errors?.["workExperience"]}
                      error={errors?.["workExperience"]?.message}
                    />

                    {/* <h4> Would you like to upload a logo?</h4>
                    <div className="col-md-12">
                      <div className="upload">
                        <h3>Upload Logo</h3>
                        <input type="file" />
                      </div>
                    </div> */}
                    <button className="btn btn-create create-account">
                      Next
                    </button>
                  </Form>

                  <p>
                    {`By clicking Next you agree to the `}
                    <Link to={ROUTES.TERMS_AND_CONDITIONS} target="_blank">
                      {" "}
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-8 text-center">
              <div className="headeing feature-missing">
                <h2 className="mt-2" id="getAllTheToolsBox">
                  Get all the Tools to Increase your Business
                </h2>
              </div>

              <div className="d-flex justify-content-center profile-builds">
                <div className="boxes">
                  <img alt="alt" src={build} className="" />
                  <h2>Build your Brand</h2>
                  <p>
                    Get free listing and enhance visibility to millions of
                    Homeowners
                  </p>
                </div>
                <div className="boxes">
                  <img alt="alt" src={genrate} className="" />
                  <h2>Generate & Manage Leads</h2>
                  <p>Get Business Leads and increase your business</p>
                </div>
              </div>
              <div className="d-flex justify-content-center profile-builds mt-3">
                <div className="boxes">
                  <img alt="alt" src={mobileone} className="" />
                  <h2>Avail Brand Offers</h2>
                  <p>
                    Avail exclusive discounts on Interior Products for your
                    clients
                  </p>
                </div>

                <div className="boxes ">
                  <img alt="alt" src={bqq} className="" />
                  <h2>BOQ Assistance</h2>
                  <p>
                    Book a slot with our Commercial team and take advisory on
                    your Project BOQ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonial />

      <section className="any-question">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-start">
              <h2 id="gotAnyQuestionHeading">Got any question ?</h2>
              <p>Our team will love to help you</p>
            </div>
            <div className="col-md-4 align-items-center justify-content-end d-flex text-end">
              <button className="know-more">Request a Call back</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileBuild;

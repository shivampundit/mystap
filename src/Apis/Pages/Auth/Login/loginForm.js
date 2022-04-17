import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../Constants";
import FormInput from "../../../Components/Forms/FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogin,
  handleRegister,
  completeProfile,
} from "../../../Redux/Actions/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Spinner, Modal } from "react-bootstrap";
import { getDeviceId, scrollToTop } from "../../../Helpers/utils";
import { signInWithGoogle } from "../../../Config/firebase";
import { toast } from "react-toastify";
import { AUTH_TYPE } from "../../../Constants/enums";
import { socialLogin, resetPassword } from "../../../Apis";
import googleLogo from "../../../Assets/Logos/Social/googleLogin.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(AUTH_TYPE.SIGN_UP);
  const [showPass, setShowPass] = useState(false);
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState();
  const isLoading = useSelector((state) => state.auth.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginHandler = (data) => {
    const payload = { ...data, deviceId: `${getDeviceId()}` };
    if (type === AUTH_TYPE.LOGIN) {
      dispatch(handleLogin(payload));
    } else {
      dispatch(handleRegister(payload));
    }
  };

  const googleLogin = () => {
    signInWithGoogle()
      .then((response) => {
        socialLogin({
          email: response.user.email,
          googleId: response.user.uid,
          deviceId: `${getDeviceId()}`,
        }).then((res) => {
          dispatch(completeProfile(res?.data));
        });
      })
      .catch((err) => {
        toast.error("Cannot authenticate! try again");
      });
  };

  const forgotPassword = (e) => {
    e?.preventDefault();
    const email = e?.target[0]?.value;
    resetPassword({ email }).then(() => setLink(e?.target[0]?.value));
  };

  return (
    <Fragment>
      <div>
        <ul
          className="nav nav-tabs"
          id="myTab"
          role="tablist"
          style={{ width: "100%" }}
        >
          {["Sign Up", "Log In"].map((item, i) => (
            <li className="nav-item" key={i} style={{ width: "50%" }}>
              <button
                className={`nav-link ${i === type ? "active" : ""}`}
                style={{ width: "100%" }}
                onClick={() => setType(i)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <Form onSubmit={handleSubmit(loginHandler)}>
          <FormInput
            type="text"
            placeholder="Your Business Email"
            isInvalid={!!errors?.email}
            error={errors?.email?.message}
            register={register("email")}
          />

          <div className="zoom-input">
            <FormInput
              type={showPass ? "text" : "password"}
              placeholder="Password"
              isInvalid={!!errors?.password}
              error={errors?.password?.message}
              register={register("password")}
              className="mb-2"
              formControlClass="disableErrorIcon"
            />
            <span
              onClick={() => setShowPass((show) => !show)}
              className="pointer"
            >
              <FontAwesomeIcon
                icon={showPass ? "eye-slash" : "eye"}
                className="me-1"
              />
            </span>
          </div>
          <span className="forgotPassword" onClick={() => setModal(true)}>
            Forgot Password?
          </span>

          <button
            className="btn btn-create create-account"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner animation="border" variant="light" />
            ) : type === AUTH_TYPE.SIGN_UP ? (
              "Create Free Account"
            ) : (
              "Login"
            )}
          </button>
          <div className="or">
            <span>OR</span>
          </div>
        </Form>
        <button className="btn btn-create sign-google" onClick={googleLogin}>
          <img src={googleLogo} className="me-2" height={20} alt="googlelogo" />
          Sign in with Google
        </button>
        <p className="login-terms">
          {`On signing you agree to our `}
          <Link to={ROUTES.TERMS_AND_CONDITIONS} onClick={scrollToTop}>
            {`Terms of use `}
          </Link>
          {` and `}
          <Link to={ROUTES.PRIVACY_POLICY} onClick={scrollToTop}>
            {`Privacy Policy`}
          </Link>
        </p>
      </div>
      <Modal
        show={modal}
        onHide={() => {
          setModal(false);
          setLink(null);
        }}
        centered
        className="interFont"
      >
        <Modal.Header closeButton>
          <Modal.Title>{link ? "Email Sent" : "Forgot Password?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {link ? (
            <p>
              {`We have sent an email to ${link} with a link to reset
                your password.`}
            </p>
          ) : (
            <Form onSubmit={forgotPassword}>
              <FormInput
                name="email"
                label="Enter Email Address"
                type="email"
                placeholder="Enter Email Address"
                required
              />
              <button className="btn btn-create create-account" type="submit">
                Request a reset link
              </button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default LoginForm;

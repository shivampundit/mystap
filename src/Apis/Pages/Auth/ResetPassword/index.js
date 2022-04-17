import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../../Constants";
import FormInput from "../../../Components/Forms/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updatePassword } from "../../../Apis";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const [showPass, setShowPass] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  useEffect(() => {
    if (!id) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [id, navigate]);

  const resetPassword = ({ password }) => {
    updatePassword({ id, password }).then(() => setComplete(true));
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Header>
          <Card.Title>
            {complete ? `Password Changed` : `Reset Password`}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {complete ? (
            <>
              <Card.Text>
                Your password has been successfully changed.
              </Card.Text>
              <Link to={ROUTES.LOGIN}>
                <button className="btn btn-create create-account">
                  Log in
                </button>
              </Link>
            </>
          ) : (
            <Form onSubmit={handleSubmit(resetPassword)}>
              <div className={styles.input}>
                <FormInput
                  label="New Password"
                  type={showPass ? "text" : "password"}
                  placeholder="New Password"
                  isInvalid={!!errors?.password}
                  error={errors?.password?.message}
                  register={register("password")}
                  formControlClass="disableErrorIcon"
                />
                <span
                  onClick={() => setShowPass((show) => !show)}
                  className={styles.eye}
                >
                  <FontAwesomeIcon
                    icon={showPass ? "eye-slash" : "eye"}
                    className="me-1"
                  />
                </span>
              </div>
              <div className={styles.input}>
                <FormInput
                  label="Confirm New Password"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm New Password"
                  isInvalid={!!errors?.confirmPassword}
                  error={errors?.confirmPassword?.message}
                  register={register("confirmPassword")}
                  formControlClass="disableErrorIcon"
                />
                <span
                  onClick={() => setShowConfirmPass((show) => !show)}
                  className={styles.eye}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPass ? "eye-slash" : "eye"}
                    className="me-1"
                  />
                </span>
              </div>
              <button type="submit" className="btn btn-create create-account">
                Reset
              </button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPassword;

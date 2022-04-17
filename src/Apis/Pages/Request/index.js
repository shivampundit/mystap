import React from "react";
import requestHeader from "../../Assets/Dashboard/requestHeader.png";
import { FormControl } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { callbackSchema } from "../../Constants";
import { contact } from "../../Apis";
import { toast } from "react-toastify";

const Request = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", name: "", message: "" },
    resolver: yupResolver(callbackSchema),
  });

  const onCallbackSubmit = (payload) => {
    contact(payload).then((res) => {
      toast.success("Callback query submitted");
      reset({ email: "", name: "", message: "" });
    });
  };
  return (
    <>
      <div className="request_form">
        <div className="container">
          <div className="d-flex">
            <div className="col-md-6 mt-5">
              <h3>Have a Query?</h3>
              <p>Our support team will love to answer your queries</p>
              <form onSubmit={handleSubmit(onCallbackSubmit)}>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <FormControl
                    type="name"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="name"
                    isInvalid={!!errors?.message}
                    {...register("name")}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <FormControl
                    type="email"
                    name="email"
                    {...register("email")}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    isInvalid={!!errors?.message}
                  />
                </div>

                <div className="mb-3">
                  <label
                    for="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Description
                  </label>
                  <FormControl
                    as="textarea"
                    name="message"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    {...register("message")}
                    isInvalid={!!errors?.message}
                  />
                </div>
                <button type="submit" className="know-more mt-2">
                  Submit
                </button>
                <div className="pt-3">
                  <p>(We’ll reach you within 24 hrs)</p>
                </div>
              </form>
            </div>
            <div clasName="col-md-6">
              <div className="request_header">
                <img src={requestHeader} alt="No" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;

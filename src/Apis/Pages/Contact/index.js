import React, { Fragment } from "react";
import { CONTACT_INFO } from "../../Constants/strings";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../../Constants";
import { submitQuery } from "../../Apis";
import { toast } from "react-toastify";
import FormInput from "../../Components/Forms/FormInput";

const Contact = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const querySubmit = (values) => {
    submitQuery({
      ...values,
      type: 2,
      phoneNumber: `${values?.phoneNumber}`,
    }).then((res) => {
      toast.success("Query Sent");
      reset();
    });
  };
  return (
    <>
      <div className="main_contact">
        <div className="bg_contact">
          <div className="container">
            <div className="contact_content">
              <h1>Contact Us</h1>
              <p>With you, every step of the way!</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="nextSection_contact">
            <h3>Contact Us</h3>
            <div className="container">
              <div className="d-flex">
                <div className="col-md-7 ps-5 contact_sections">
                  {CONTACT_INFO.map((item, i) => (
                    <Fragment key={i}>
                      <h6>{item.title}</h6>
                      {item.contact.map((contact, index) => (
                        <Fragment key={index}>
                          <div className="label">
                            <label>{contact.label}</label>
                          </div>
                          <div className="input">
                            <input placeholder={contact.value} disabled />
                          </div>
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </div>
                <div className="col-md-5">
                  <form onSubmit={handleSubmit(querySubmit)}>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <FormInput
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            isInvalid={!!errors?.name}
                            error={errors?.name?.message}
                            register={register("name")}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormInput
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            isInvalid={!!errors?.email}
                            error={errors?.email?.message}
                            register={register("email")}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <FormInput
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter phone number"
                            isInvalid={!!errors?.phoneNumber}
                            error={errors?.phoneNumber?.message}
                            register={register("phoneNumber")}
                          />
                        </div>
                        <div className="col-md-6">
                          <FormInput
                            name="subject"
                            label="Subject"
                            placeholder="Enter Subject"
                            isInvalid={!!errors?.subject}
                            error={errors?.subject?.message}
                            register={register("subject")}
                          />
                        </div>
                      </div>

                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Message
                      </label>

                      <FormInput
                        rows="3"
                        as="textarea"
                        name="data"
                        placeholder="Enter Query Message"
                        isInvalid={!!errors?.data}
                        register={register("data")}
                        error={errors?.data?.message}
                      />

                      <div>
                        <input type="checkbox" name={"isagree"} />
                        {` I agree to receive all your updates over RCS, RBM, Whatsapp & Sms`}
                      </div>
                    </div>
                    <button className="know-more mt-2" type="submit">
                      Send
                    </button>
                  </form>
                  {/* <h6 className="mt-4">Our Office</h6>
                  <p>
                    orem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

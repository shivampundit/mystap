import React from "react";
import info from "../../../Assets/Dashboard/info.png";
import feather from "../../../Assets/Dashboard/feather_download.png";
import upload from "../../../Assets/Dashboard/upload.svg";
import { FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { discountDocumentSchema } from "../../../Constants";
import { updateUserProfile } from "../../../Apis";
import { completeProfile } from "../../../Redux/Actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../Router/routes";

const defaultValues = {
  discountForDesigner: "",
  masterRateFile: null,
};

const DiscountDocument = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(discountDocumentSchema) });

  const onSubmit = (data) => {
    const payload = new FormData();
    payload.append("discountForDesigner", data?.discountForDesigner);
    payload.append("masterRateFile", data?.masterRateFile?.[0]);

    updateUserProfile(payload).then((res) => {
      dispatch(completeProfile(res?.data));
      navigate(ROUTES.UPLOAD_PROJECT);
    });
  };

  return (
    <>
      <section className="main-section services-offered document-offered">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="upload-main">
                <h2>Discount and Documents </h2>

                <p className="mb-4 mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="dicount-doc mt-5">
                    <div className="dicount-form mb-4">
                      <label className="me-4">
                        Discount to be provided to designers
                      </label>
                      <FormControl
                        type="number"
                        {...register("discountForDesigner")}
                        placeholder="Enter percentage value"
                        isInvalid={!!errors?.discountForDesigner}
                      />
                    </div>
                   

                    <div className="dicount-form mb-4">
                      <label className="me-4">
                        Discount to be provided to designers{" "}
                        <img src={info} className="ms-3" alt="" />
                      </label>
                      <button className="download-btn">
                        <img src={feather} className="me-2" alt="" /> Download
                        sample rate card
                      </button>
                    </div>

                    <div className="upload-images d-flex align-items-center justify-content-center mt-5">
                      <img src={upload} alt="pic" className="me-3" />
                      <h3>
                        {getValues("masterRateFile")
                          ? getValues("masterRateFile")?.name
                          : "Upload MR documents"}
                      </h3>
                      <input
                        type="file"
                        {...register("masterRateFile")}
                        // onChange={(e) =>
                        //   setValue("masterRateFile", e.target.files[0])
                        // }
                      />
                    </div>
                    <p className="red-error">
                      *upload upto 1 file with .pdf,..xlsx
                    </p>
                    {!!errors?.masterRateFile && (
                      <p className="red-error">required*</p>
                    )}
                  </div>

                  <button className="know-more mt-4">Next</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountDocument;

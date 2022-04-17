import React, { useState, useEffect } from "react";
import contactHeader from "../../../Assets/Dashboard/contactHeader.png";
import user from "../../../Assets/profile/user.png";
import plan from "../../../Assets/Dashboard/planbanner.png";
import camera from "../../../Assets/Logos/camera.svg";
import { getUserProfile, updateUserProfile } from "../../../Apis";
import { Form } from "react-bootstrap";
import { updateProfileSchema } from "../../../Constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInput from "../../../Components/Forms/FormInput";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { getProjectImg } from "../../../Helpers/utils";
import ProjectCard from "../../../Components/Cards/projectCard";
import { useDispatch } from "react-redux";
import { completeProfile } from "../../../Redux/Actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const fields = [
  {
    name: "firstName",
    type: "text",
    label: "First Name *",
    col: "6",
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name *",
    col: "6",
  },
  {
    name: "companyName",
    type: "text",
    label: "Company Name *",
    col: "12",
  },
  {
    name: "email",
    type: "text",
    label: "Email *",
    col: "6",
  },
  {
    name: "phoneNumber",
    type: "text",
    label: "Mobile Number *",
    col: "6",
  },
  // {
  //   name: "address",
  //   type: "text",
  //   label: "Company Address *",
  //   col: "12",
  // },
  {
    name: "city",
    type: "text",
    label: "City *",
    col: "6",
  },
  {
    name: "pinCode",
    type: "text",
    label: "Pin Code *",
    col: "6",
  },
];

const MyProfile = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(updateProfileSchema) });

  useEffect(() => {
    getUserProfile().then((res) => {
      setUserData(res?.data);
      reset(res?.data);
    });
  }, [success, reset]);

  const updateProfile = (data) => {
    const payload = new FormData();
    payload.append("firstName", data?.firstName);
    payload.append("lastName", data?.lastName);
    payload.append("email", data?.email);
    payload.append("phoneNumber", data?.phoneNumber);
    payload.append("companyName", data?.companyName);
    // payload.append("address", data?.address);
    payload.append("city", data?.city);
    payload.append("pinCode", data?.pinCode);

    updateUserProfile(payload).then((res) => {
      setIsEdit(false);
      setSuccess((s) => !s);
      toast.success("Profile Updated!");
    });
  };

  const changeImage = (e, cover) => {
    const file = e.target.files[0];
    if (file) {
      const payload = new FormData();
      if (cover) {
        payload.append("coverImage", file);
      } else {
        payload.append("image", file);
      }
      confirmAlert({
        message: `Are you sure you want to change ${cover || "profile"} image?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              updateUserProfile(payload).then((res) => {
                dispatch(completeProfile(res?.data));
                setSuccess((s) => !s);
                toast.success("Image Updated!");
              });
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  return (
    <section className="main-section my-profile">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="my-profile-banner">
              <div className="position-relative">
                <img
                  src={userData?.coverImage?.thumbnail || contactHeader}
                  alt=""
                  className="my-profile-cover-img"
                />
                {!!isEdit && (
                  <>
                    <label
                      className="uploadPhotoDiv pointer"
                      htmlFor="coverImg"
                    >
                      <img alt="" src={camera} className="uploadPhotoIcon" />
                    </label>
                    <input
                      type="file"
                      hidden
                      id="coverImg"
                      onChange={(e) => changeImage(e, "cover")}
                    />
                  </>
                )}
              </div>
              <div className="profile-name d-flex align-items-center justify-content-between">
                <div className="profile-img d-flex">
                  <div className="position-relative">
                    <img
                      src={userData?.imageUrl?.thumbnail || user}
                      className="rounded-circle"
                      alt=""
                    />
                    {!!isEdit && (
                      <>
                        <label
                          className="uploadPhotoDiv2 pointer"
                          htmlFor="profileImg"
                        >
                          <img
                            alt=""
                            src={camera}
                            className="uploadPhotoIcon"
                          />
                        </label>
                        <input
                          type="file"
                          hidden
                          id="profileImg"
                          onChange={changeImage}
                        />
                      </>
                    )}
                  </div>
                  {!isEdit && (
                    <div className="user_name ms-4">
                      <h2>{`${userData?.firstName || ""} ${
                        userData?.lastName || ""
                      }`}</h2>
                      <p>Design Agency · Designer</p>
                      <p>{userData?.city || ""}</p>
                      <p>{`${userData?.phoneNumber} · ${userData?.email}`}</p>
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-edit"
                  onClick={() => setIsEdit((s) => !s)}
                >
                  {isEdit ? "Cancel" : "Edit"}
                </button>
              </div>

              {!!isEdit && (
                <Form onSubmit={handleSubmit(updateProfile)}>
                  <div className="edit-profile-form pl-4">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <div className="row">
                          {fields.map(({ col, ...field }, i) => (
                            <div className={`col-md-${col}`} key={i}>
                              <div className="profilr-form">
                                <FormInput
                                  {...field}
                                  isInvalid={!!errors?.[field.name]}
                                  error={errors?.[field.name]?.message}
                                  register={register(field.name)}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="col-md-12">
                            <div className="profilr-form">
                              <button className="save-btn" type="submit">
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </div>
          </div>
          <div className="col-md-12 mt-5">
            <div className="my-projects d-flex align-items-center justify-content-between">
              <h2 className="my-oders">{`My Projects ${
                userData?.projects?.length || 0
              }`}</h2>
              <div className="d-flex">
                <Link
                  to={ROUTES.UPLOAD_PROJECT}
                  className="me-3"
                  state={{ addFromProfile: true }}
                >
                  <p>Add Project</p>
                </Link>
                <Link to={ROUTES.ALL_PROJECTS}>
                  <p>See All</p>
                </Link>
              </div>
            </div>
          </div>
          {userData?.projects?.map((project, i) => (
            <ProjectCard
              key={i}
              name={project?.name}
              address={project?.address}
              img={getProjectImg(project?.data)}
              isPublic={project?.isPublic}
              projectId={project?._id}
              setSuccess={setSuccess}
            />
          ))}

          {userData?.planId?.price !== 0 ? (
            <div className="col-md-12 mt-5">
              <h2 className="my-oders">My Orders</h2>
              <div className="checkout-content d-flex  justify-content-between">
                <div className="checkout-img-text d-flex">
                  <div className="checkout-img">
                    <img
                      src={userData?.planId?.imageUrl?.original || plan}
                      alt="icon"
                    />
                  </div>
                  <div className="checkout-text">
                    <div className="dash-plan ps-5">
                      <h4>{userData?.planId?.name}</h4>

                      <ul className="plan-ul">
                        {(userData?.planId?.features || []).map(
                          (feature, i) => (
                            <li key={i}>{feature}</li>
                          )
                        )}
                      </ul>
                      {/* <h5 className="mt-3 mb-3">
                        {`₹ ${userData?.planId?.price}/`}
                        <span>month</span>
                      </h5> */}
                      <Link to={ROUTES.PLANS}>
                        <button className="change-plan btn">
                          Upgrade Plan
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="checkout-text billing-right">
                  <div className="dash-plan ps-5">
                    <h4>Billing</h4>

                    <ul className="plan-ul">
                      <li>
                        <FontAwesomeIcon icon="calendar-day" />{" "}
                        {`₹ ${userData?.planId?.price}/`}
                        <span>month</span>
                      </li>
                      <li>{`Service Will expire on ${moment(
                        userData?.planBuyDate || new Date()
                      )
                        .add(userData?.planId?.duration, "months")
                        .format("MMM DD, YYYY")}`}</li>
                      <li>{`${userData?.planId?.duration} Months Plan`}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;

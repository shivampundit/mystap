import React, { useEffect } from "react";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./style.css";
import { ROUTES } from "../../../../Router/routes";
import { Link } from "react-router-dom";
import { store } from "../../../../Redux/store";
import { BASE_URL } from "../../../../Config";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../../../Assets/Dashboard/upload.svg";
import checbox from "./checkbox.png";
import dragDropPlusPic from "./dragDropPlusPic.png";
import {
  addProject,
  deleteProject,
} from "../../../../Redux/Actions/actionTypes";
import {
  insertImage,
  deleteImage,
} from "../../../../Redux/Actions/actionTypes";
import { setFeaturedImage } from "../../../../Redux/Actions/actionTypes";
import axios from "axios";
import { uploadImage } from "../../../../Apis";
// var FormData = require('form-data');

const AddPhotos = () => {
  const [open, setOpen] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectArea, setProjectArea] = useState("");
  const [projectCity, setProjectCity] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const ProjectData = useSelector((state) => state["project"]);

  const [selectedFiles, setSelectedFiles] = useState(
    ProjectData[0] ? ProjectData[0].images : []
  );
  const [currentProject, setCurrentProject] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [FeaturedImage, setFeaturedImages] = useState(
    ProjectData[0] ? ProjectData[0].featuredImage : []
  );

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => file);
      console.log("filesArray: ", filesArray);

      setSelectedFiles(selectedFiles.concat(filesArray));
      // setSelectedImg(imgArray);
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
      dispatch(insertImage(currentProject, selectedFiles.concat(filesArray)));
    }
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const radioFunctionality = () => {
    const temp = [];
    const elements = document.querySelectorAll(".custom-control-input");
    // console.log(elements);
    elements.forEach((element, index) => {
      // console.log(element.checked);
      if (element.checked && !element.disabled) {
        setSelectedImage(element.checked);
        temp.push(element.id);
      }
      return <></>;
    });
    setSelectedImages(temp);
    console.log(temp);
  };

  useEffect(() => {
    setSelectedFiles(ProjectData[currentProject].images);
  });

  async function handleSubmit(data) {
    console.warn(store.getState().auth.accessToken);
    await axios
      .post(
        `${BASE_URL}/api/addProject`,
        {
          userId: window.localStorage.getItem("userId"),
          name: data.projectName,
          address: data.projectArea,
          city: data.projectCity,
        },
        {
          headers: {
            authorization: store.getState().auth.accessToken
              ? `Bearer ${store.getState().auth.accessToken}`
              : "",
          },
        }
      )
      .then((response) => {
        const image = new FormData();
        for (const file of data.images) {
          console.warn(file.name);
          image.append("image", file);
          console.log(image);
        }

        const featured = new FormData();
        featured.append("featured", data.featuredImage);
        console.log(featured);
        const id = response.data.data._id;
        axios
          .put(`${BASE_URL}/api/uploadImages?id=${id}`, image, {
            headers: {
              authorization: store.getState().auth.accessToken
                ? `Bearer ${store.getState().auth.accessToken}`
                : "",
            },
          })
          .then((response) => {
            console.log(response);
          });
        axios
          .put(`${BASE_URL}/api/uploadFeatured?id=${id}`, featured, {
            headers: {
              authorization: store.getState().auth.accessToken
                ? `Bearer ${store.getState().auth.accessToken}`
                : "",
            },
          })
          .then((response) => {
            console.log(response);
          });
        toast.success("Project Uploaded Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const renderPhotos = (source, featuredImage) => {
    console.log("source: ", source);
    return source.map((photo, index) => {
      return (
        <div className="uploadedPic">
          <div className="check">
            {photo === featuredImage ? (
              <p id="feat" style={{}}>
                Featured Photo
              </p>
            ) : (
              <input
                type="checkbox"
                name="featured"
                value={currentProject}
                className="custom-control-input checkBoxesOnImages"
                id={index}
                onClick={radioFunctionality}
              />
            )}
            <label className="custom-control-label" for="ck1a" />
          </div>
          <img
            className="uploadedImages"
            style={{
              borderRadius: "5px",
              border: selectedImages.includes(`${index}`)
                ? "3px solid #3B5998"
                : "none",
            }}
            src={URL.createObjectURL(photo)}
            alt=""
            key={photo}
          />
        </div>
      );
    });
  };

  return (
    <div className="main_add">
      <div
        className="container"
        style={
          {
            // padding: "1em",
          }
        }
      >
        <h6>Step 3 of 3</h6>
        <h2 style={{ margin: "0.6em 0", fontFamily: "Inter" }}>
          Add Photos to Project
        </h2>
        <div>
          <div className="heading_manage">
            <div className="projects">
              {ProjectData.map((project, index) => {
                if (project) {
                  return (
                    <button
                      key={index}
                      className="tab"
                      id={index}
                      onClick={(e) => {
                        setCurrentProject(e.target.id);
                        setSelectedFiles(ProjectData[e.target.id].images);
                        radioFunctionality();
                      }}
                    >
                      {project.projectName}
                    </button>
                  );
                }
              })}
            </div>
            <button className="btnNext" onClick={onOpenModal}>
              {" "}
              <b>+</b> Add New Project
            </button>
          </div>

          <Modal open={open} onClose={onCloseModal} center>
            <div className="row">
              <form
                className="projectData"
                style={{
                  height: "fit-content",
                }}
              >
                <h5 style={{ marginTop: "2%" }}>Add Project Name</h5>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    marginTop: "3%",
                  }}
                >
                  <label>Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  <label>Building Name or Area Name</label>
                  <input
                    type="text"
                    placeholder="Enter Building Name or Area Name"
                    value={projectArea}
                    onChange={(e) => setProjectArea(e.target.value)}
                  />
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="Enter City"
                    value={projectCity}
                    onChange={(e) => setProjectCity(e.target.value)}
                  />
                </div>

                <Link to={ROUTES.ADD_PHOTOS}>
                  <button
                    onClick={() => {
                      dispatch(
                        addProject({ projectName, projectArea, projectCity })
                      );
                      radioFunctionality();
                      setOpen(false);
                    }}
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#3B5998",
                      color: "white",
                    }}
                  >
                    Next
                  </button>
                </Link>
              </form>
            </div>
          </Modal>

          <div className="photoUploadHeading">
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h5
                  style={{
                    fontSize: "1em",
                    fontFamily: "Inter",
                  }}
                >
                  {ProjectData[currentProject].projectArea}
                </h5>
                <h5> * </h5>
                <h5
                  style={{
                    fontSize: "1em",
                    fontFamily: "Inter",
                  }}
                >
                  {ProjectData[currentProject].projectCity}
                </h5>
                <h5> | </h5>
                <p
                  className="fa fa-pencil"
                  style={{
                    fontSize: "1.3rem",
                    position: "relative",
                    top: "0.3rem",
                    cursor: "pointer",
                    fontFamily: "Inter",
                  }}
                >
                  &#x1F589;
                </p>
                <h5 style={{ fontSize: "1em", fontFamily: "Inter" }}>Edit</h5>
                {selectedImages.length >= 1 ? <h5> | </h5> : ""}
              </div>
              <div className="control_button">
                {selectedImages.length === 1 ? (
                  <div style={{ margin: "0", padding: "0", display: "flex" }}>
                    <button
                      id="makeFeaturedImageButton"
                      onClick={() => {
                        // setFeaturedImages(
                        //   ProjectData[currentProject].images[selectedImages]
                        // );
                        // alert(JSON.stringify(ProjectData[currentProject].images[selectedImages));
                        // alert(selectedImages[0]);
                        dispatch(
                          setFeaturedImage(
                            currentProject,
                            ProjectData[currentProject].images[
                              selectedImages[0]
                            ]
                          )
                        );
                        const elements = document.querySelectorAll(
                          ".custom-control-input"
                        );
                        // console.log(elements);
                        elements.forEach((element, index) => {
                          // console.log(element.checked);
                          element.checked = false;
                          return <></>;
                        });
                        setSelectedImages([]);
                      }}
                    >
                      {/* {console.warn(selectedImages)} */}
                      Set as Featured
                    </button>
                  </div>
                ) : null}
                {selectedImages.length > 0 ? (
                  <button
                    id="deleteImageButton"
                    onClick={() => {
                      // let imageId = Math.floor(Math.random() * 100);
                      // alert(JSON.stringify(selectedImages));

                      dispatch(deleteImage(selectedImages));
                      // if (currentImage) {
                      // }
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </span>

            {/* {project[key].projectName} */}
          </div>
          <div className="photoUploadBody">
            {selectedFiles.length >= 1 ? (
              <div className="noteInAddFileBox">
                Note: Please&nbsp;
                <img
                  src={checbox}
                  style={{ position: "relative" }}
                  alt="checkbox"
                />
                &nbsp;a photo for featured image
              </div>
            ) : (
              ""
            )}
            <div className="result" id="filesAddedBox">
              {selectedFiles.length >= 1 ? (
                <div className="add_file">
                  <label
                    id="add_file"
                    for="choose-file"
                    class="custom-file-upload"
                    style={{ fontFamily: "Inter" }}
                  >
                    <b>+</b>&nbsp;Add Files
                    <input
                      type="file"
                      multiple
                      style={{
                        position: "relative",
                        textAlign: "center",
                        width: "100%",
                        display: "none",
                        // display: "none",
                      }}
                      id="choose-file"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              ) : (
                <div
                  className="dragDropPlusPic"
                  style={{
                    display: "flex",
                    justifyItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <label
                      id="dragDropPlusPicLabel"
                      for="choose-file"
                      className="custom-file-upload-dragDropPlusPic"
                    >
                      <img
                        // style={{ width: "40px", height: "40px", margin: "1em 0" }}
                        src={dragDropPlusPic}
                        alt="pic"
                        id="dragDropPlusPicImg"
                      />
                      <input
                        type="file"
                        multiple
                        style={{
                          position: "relative",
                          textAlign: "center",
                          width: "100%",
                          display: "none",
                        }}
                        id="choose-file"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              )}
              {selectedFiles.length >= 1 ? (
                <div
                  className="alignment"
                  style={{ overflowY: "hidden", width: "100%" }}
                >
                  <div id="alignmentOfAddedImages">
                    {renderPhotos(
                      selectedFiles,
                      ProjectData[currentImage].featuredImage
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="footer_control">
            <button
              style={{
                color: "#8A8A8A",
                border: "none",
                backgroundColor: "white",
                fontFamily: "Inter",
              }}
              onClick={() => {
                if (currentProject) {
                  dispatch(deleteProject(currentProject));
                  setCurrentProject(0);
                }
              }}
            >
              Delete Project
            </button>
            <Link to={"/project-summary"}>
              <button
                onClick={() => {
                  dispatch(setFeaturedImage(currentProject, FeaturedImage));
                  if (parseInt(currentProject) < ProjectData.length - 1) {
                    // alert(currentProject);
                    setCurrentProject(parseInt(currentProject) + 1);
                  } else {
                    // <Navigate to={ROUTES.PROJECT_SUMMARY} replace />;
                    console.log("go to next page");
                  }
                  handleSubmit(ProjectData[currentProject]);

                  // alert(currentProject);
                }}
                className="btnNext"
              >
                Save and Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhotos;

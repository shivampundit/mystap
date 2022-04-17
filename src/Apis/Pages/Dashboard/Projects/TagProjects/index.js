import React, { useEffect, useState, useRef } from "react";
import tickblack from "../../../../Assets/Dashboard/tickinactive.svg";
import tickgreen from "../../../../Assets/Dashboard/tickactive.svg";
import { confirmAlert } from "react-confirm-alert";
import { Modal } from "react-bootstrap";
import FormInput from "../../../../Components/Forms/FormInput";
import cloneDeep from "lodash/cloneDeep";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../../../Router/routes";
import styles from "./styles.module.scss";
import { uploadImage } from "../../../../Apis";
import { ProjectModal, MultiProjectModal } from "./modals";
import { getImageIndex } from "../../../../Helpers/utils";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { newProjectSchema } from "../../../../Constants";
import { yupResolver } from "@hookform/resolvers/yup";

export const ROOMS = [
  "Living Room",
  "Dining Room",
  "Bed Room",
  "Kitchen",
  "Bathroom",
];
const roomsInit = {};
ROOMS.forEach((item) => (roomsInit[item] = []));

const TagProjects = () => {
  const {
    state: { data: uploadedImages, addFromProfile },
  } = useLocation();
  const defaultImages = useRef(
    Array.isArray(uploadedImages) ? uploadedImages : [{ ...uploadedImages }]
  );
  const navigate = useNavigate();

  const [multipleModal, setMultipleModal] = useState(false);
  const [images, setImages] = useState(defaultImages.current);
  const [projects, setProjects] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [allSelectedImages, setAllSelectedImages] = useState([]);
  const [project, setProject] = useState();
  const [room, setRoom] = useState(ROOMS[0]);
  const [detailModal, setDetailModal] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newProjectSchema),
  });

  // project modal
  useEffect(() => {
    if (uploadedImages) {
      confirmAlert({
        closeOnClickOutside: false,
        customUI: ({ onClose }) => (
          <ProjectModal
            onClose={onClose}
            onMultiClick={() => {
              setMultipleModal(true);
              onClose();
            }}
            onSingleClick={(e) => setNewProjects(e, onClose)}
          />
        ),
      });
    }
  }, [uploadedImages]);

  // Multiple projects input modal
  useEffect(() => {
    if (multipleModal) {
      confirmAlert({
        closeOnClickOutside: false,
        customUI: ({ onClose }) => (
          <MultiProjectModal onSubmit={(e) => setNewProjects(e, onClose)} />
        ),
      });
    }
  }, [multipleModal]);

  // Multiple projects input modal
  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  if (!uploadedImages) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  // set new projects
  const setNewProjects = (e, onClose) => {
    e?.preventDefault();
    const count = +e?.target?.[0]?.value || 1;
    const newProjects = new Array(count).fill(0).map((_, i) => ({
      key: i,
      projectName: "",
      buildingName: "",
      city: "",
      rooms: cloneDeep(roomsInit),
    }));
    setProjects(newProjects);
    reset(cloneDeep(newProjects[0]));
    setProject(cloneDeep(newProjects[0]));
    onClose();
    setDetailModal(true);
  };

  // change selected project
  const onProjectChange = (index) => {
    const selectedProject = cloneDeep(projects[index]);
    setProject(selectedProject);
    setSelectedImages(selectedProject.rooms[room]);
    reset(selectedProject);
  };

  const addRemoveIndex = (arr, index) => {
    const copyArr = cloneDeep(arr);
    const indexOfItem = copyArr.findIndex((i) => i === index);
    if (indexOfItem === -1) {
      copyArr.push(index);
    } else {
      copyArr.splice(indexOfItem, 1);
    }
    return copyArr;
  };

  // select image and add it in room
  const selectImage = (imgIndex) => {
    setAllSelectedImages((prev) => addRemoveIndex(prev, imgIndex));
    const selectedImagesCopy = addRemoveIndex(selectedImages, imgIndex);
    const projectsCopy = cloneDeep(projects);
    const projectIndex = projectsCopy.findIndex(
      (item) => item?.key === project?.key
    );
    projectsCopy[projectIndex].rooms[room] = selectedImagesCopy;
    setSelectedImages(selectedImagesCopy);

    setProjects(projectsCopy);
  };

  // add more images to room
  const addImagesToRoom = (e) => {
    const files = e?.target?.files;
    if (files) {
      const payload = new FormData();
      for (const file of files) {
        payload.append("image", file);
      }
      uploadImage(payload).then((res) => {
        const images = Array.isArray(res?.data)
          ? res?.data
          : [{ ...res?.data }];
        setImages((prev) => [...prev, ...images]);
      });
    }
  };

  // change room
  const changeRoom = (r) => {
    setRoom(r);
    setSelectedImages(projects?.[project?.key]?.rooms[r] || []);
  };

  // create new project
  const addNewProject = (values) => {
    if (isAddNew) {
      const newProject = {
        ...values,
        key: projects?.length,
        rooms: cloneDeep(roomsInit),
      };
      setProjects((prev) => [...prev, newProject]);
      setProject(newProject);
      setSelectedImages([]);
    } else {
      const newProject = { ...cloneDeep(project), ...values };
      const projectsCopy = cloneDeep(projects);
      projectsCopy[project?.key] = newProject;
      setProject(newProject);
      setProjects(projectsCopy);
    }
    setIsAddNew(false);
    setDetailModal(false);
  };

  // delete project
  const deleteProject = () => {
    if (projects.length > 1) {
      confirmAlert({
        message: `Are you sure you want to delete ${project?.projectName} project?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              let projectsCopy = cloneDeep(projects);
              let allSelectedImagesCopy = allSelectedImages.filter((index) => {
                for (let i = 0; i < ROOMS.length; i++) {
                  if (
                    projectsCopy[project?.key]?.rooms?.[ROOMS[i]]?.includes(
                      index
                    )
                  ) {
                    return false;
                  }
                }
                return true;
              });
              projectsCopy.splice(project?.key, 1);
              projectsCopy = projectsCopy.map((p, key) => ({
                ...cloneDeep(p),
                key,
              }));
              setProject(projectsCopy[0]);
              setProjects(projectsCopy);
              setSelectedImages(projectsCopy[0]?.rooms[room]);
              setAllSelectedImages(allSelectedImagesCopy);
            },
          },
          { label: "No" },
        ],
      });
    }
  };

  const addAnotherProject = () => {
    setIsAddNew(true);
    reset({ projectName: "" });
    setDetailModal(true);
  };

  const featureImageSelection = (e, index) => {
    e?.stopPropagation();
    const projectsCopy = cloneDeep(projects);
    projectsCopy[project?.key].featuredImage = images[index];
    setProjects(projectsCopy);
  };

  // navigte to project summary page
  const nextHandler = () => {
    for (let i = 0; i < projects.length; i++) {
      if (!projects[i]?.projectName) {
        onProjectChange(i);
        setDetailModal(true);
        return;
      }
      const imageIndex = getImageIndex(i, projects);
      if (imageIndex === undefined) {
        toast.error(
          `Please select atleast 1 image in "${projects[i]?.projectName}" Project`
        );
        return;
      }
    }
    navigate(ROUTES.PROJECT_SUMMARY, {
      state: {
        projects: cloneDeep(projects),
        images: cloneDeep(images),
        addFromProfile,
      },
    });
  };

  return (
    <>
      <section className="main-section tag-projects">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start">
              <div className="upload-main">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="skip">
                    <h2>Tag Projects </h2>
                    <p>
                      Mark projects as per Room to better organize your listing
                    </p>
                  </div>
                  <Link to={ROUTES.PLANS}>
                    <span className={styles.editProject}>skip</span>
                  </Link>
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectNameContainer}>
                    {projects?.length > 1 ? (
                      <select
                        name="selected"
                        onChange={(e) => onProjectChange(+e?.target?.value)}
                        value={project?.key}
                        className={styles.projectSelect}
                      >
                        {projects.map((p, index) => (
                          <option value={index} key={index}>
                            {p.projectName || `Project ${index + 1}`}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <h4 className={styles.projectName}>
                        {project?.projectName}
                      </h4>
                    )}
                    <div>
                      <span
                        className={styles.editProject}
                        onClick={() => {
                          setIsEdit(true);
                          setDetailModal(true);
                        }}
                      >
                        Edit
                      </span>
                      {projects?.length > 1 && (
                        <span
                          className={styles.deleteProject}
                          onClick={deleteProject}
                        >
                          Delete
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={styles.buildingName}>
                    {project?.buildingName}
                    <span className="ms-2">{project?.city}</span>
                  </p>
                </div>
                <div className={styles.roomsWrapper}>
                  <div className={`${styles.roomsContainer} hideScrollbar`}>
                    {ROOMS.map((r, i) => (
                      <button
                        key={i}
                        className={`${styles.rooms} ${
                          room === r ? styles.activeRoom : ""
                        }`}
                        onClick={() => changeRoom(r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  {/* <label className={styles.addImagesButton}>
                    + Add more images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={addImagesToRoom}
                    />
                  </label> */}
                </div>

                <div className="tags-name">
                  <p>{`Selected: ${room} ---> Tag Images `}</p>
                </div>
                <div className="imagesauto">
                  <div className={styles.imagesContainer}>
                    {images.map((img, i) => {
                      if (
                        !allSelectedImages.includes(i) ||
                        selectedImages.includes(i)
                      ) {
                        return (
                          <div
                            className={styles.imageBox}
                            key={i}
                            onClick={() => selectImage(i)}
                          >
                            <img
                              alt="pic"
                              src={img?.thumbnail}
                              className={`${styles.image} ${
                                projects?.[project?.key]?.rooms[room]?.includes(
                                  i
                                )
                                  ? styles.selectedImage
                                  : ""
                              }`}
                            />
                            <img
                              alt="pic"
                              src={
                                projects?.[project?.key]?.rooms[room]?.includes(
                                  i
                                )
                                  ? tickgreen
                                  : tickblack
                              }
                              className={styles.tick}
                            />

                            <p
                              className={`${styles.imageuntag} ${
                                projects?.[project?.key]?.rooms[room]?.includes(
                                  i
                                )
                                  ? styles.selectedImagetag
                                  : ""
                              }`}
                            >
                              {projects?.[project?.key]?.rooms[room]?.includes(
                                i
                              )
                                ? room
                                : "Untagged"}
                            </p>
                            <div
                              className={`${styles.featuredBox} ${
                                projects?.[project?.key]?.featuredImage
                                  ?.thumbnail === img?.thumbnail
                                  ? styles.activeFeature
                                  : ""
                              }`}
                              onClick={(e) => featureImageSelection(e, i)}
                            >
                              Featured
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-start mt-4">
              <div className="mobileposition">
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      className="know-more addanother mt-2 me-2"
                      onClick={addAnotherProject}
                    >
                      + Add another Project
                    </button>

                    <label className={styles.addImagesButton}>
                      Upload Photos
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={addImagesToRoom}
                      />
                    </label>
                  </div>

                  <button
                    className="know-more mt-2 me-2 savenext"
                    onClick={nextHandler}
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={detailModal}
        className="interFont"
        onHide={() => (isAddNew || isEdit ? setDetailModal(false) : false)}
        centered
      >
        <form onSubmit={handleSubmit(addNewProject)}>
          <Modal.Header closeButton={isAddNew || isEdit}>
            <Modal.Title>{`Enter Project Details`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormInput
              label="Project Name"
              placeholder="Enter Project Name"
              register={register("projectName")}
              isInvalid={!!errors?.projectName}
            />
            <FormInput
              label="Building Name"
              placeholder="Enter Building Name"
              register={register("buildingName")}
              isInvalid={!!errors?.buildingName}
            />
            <FormInput
              label="City"
              placeholder="Enter City Name"
              register={register("city")}
              isInvalid={!!errors?.city}
            />
          </Modal.Body>
          <Modal.Footer className="justify-content-start">
            <button type="submit" className="know-more">
              Next
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default TagProjects;

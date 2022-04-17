import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../Router/routes";
import { addEditProject, deleteImage } from "../../../../Apis";
import { ROOMS } from "../TagProjects";
import { toast } from "react-toastify";
import { completeProfile } from "../../../../Redux/Actions/auth";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { getImageIndex } from "../../../../Helpers/utils";

const ProjectSummary = () => {
  const {
    state: { projects, images, addFromProfile },
  } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // navigate if no project found
  if (!projects) {
    return <Navigate to={ROUTES.UPLOAD_PROJECT} replace />;
  }

  // Add edit project
  const submitProject = () => {
    let payload = [];
    let usedImages = [];
    projects.forEach((project) => {
      const rooms = ROOMS.map((name) => {
        return {
          name,
          images: project?.rooms[name]?.map((imageIndex) => {
            if (!usedImages.includes(imageIndex)) {
              usedImages.push(imageIndex);
            }
            return images[imageIndex];
          }),
        };
      });
      payload.push({
        projectName: project?.projectName,
        buildingName: project?.buildingName,
        featured: project?.featuredImage,
        city: project?.city,
        rooms,
      });
    });

    // delete selected images from server
    const deleteImages = images.filter(
      (_, index) => !usedImages.includes(index)
    );
    addEditProject({ data: payload }).then(() => {
      dispatch(completeProfile({ isProjectsAdded: true }));
      deleteImage({ deleteImages }).then(() => {
        if (addFromProfile) {
          navigate(ROUTES.MY_PROFILE);
        } else {
          navigate(ROUTES.PLANS);
        }
        toast.success("Project Uploaded Successfully!");
      });
    });
  };

  const addNewProject = () => {
    navigate(-1);
  };

  return (
    <>
      <section className="main-section project-summary">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="upload-main">
                <h2>Projects Summary </h2>
                <p>
                    Thank you for submitting. Upload atleast 3 projects to make a powerful profile.
                </p>
                <div className={styles.projectsContainer}>
                  <div className={styles.projects}>
                    {projects.map((project, i, allProjects) => (
                      <div className={styles.projectBox} key={i}>
                        <img
                          src={images[getImageIndex(i, allProjects)]?.thumbnail}
                          alt="pic"
                        />
                        <h5>{project?.projectName}</h5>
                        <p>{`${project?.buildingName}${
                          project?.city ? `, ${project?.city}` : ""
                        }`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <button className="know-more mt-4 me-2" onClick={submitProject}>
                Submit
              </button>
              <button
                className="know-more bg-trans mt-4 ms-2"
                onClick={addNewProject}
              >
                + Add New Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectSummary;

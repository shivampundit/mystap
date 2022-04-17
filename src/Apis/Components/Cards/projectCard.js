import React, { forwardRef } from "react";
import { addEditProject } from "../../Apis";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";

const CustomToggle = forwardRef(({ onClick }, ref) => (
  <p
    className="dotss-profile pointer"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    ...
  </p>
));

const ProjectCard = ({
  name = "",
  img = "",
  address = "",
  projectId = "",
  isPublic = false,
  setSuccess,
}) => {
  // Handle Project Actions
  const projectAction = (payload) => {
    if (payload?.isDeleted) {
      confirmAlert({
        message: "Are you sure you want to delete project?",
        buttons: [
          { label: "Yes", onClick: () => updateProject(payload) },
          { label: "No" },
        ],
      });
    } else {
      updateProject(payload);
    }
  };

  // Add Edit Project Api
  const updateProject = (payload) =>
    addEditProject(payload).then((res) => {
      toast.success(res?.message);
      setSuccess((s) => !s);
    });

  return (
    <div className="col-md-6">
      <div className="projects-card">
        <div className="profile-name d-flex align-items-start justify-content-between">
          <div className="profile-img d-flex">
            <img src={img} className="me-3" alt="" />
            <div className="user_name">
              <h2>{name}</h2>
              <p className="mt-2">
                <span>{address}</span>
              </p>
            </div>
          </div>
          <div className="form-check form-switch">
            <label
              className="form-check-label positionss"
              htmlFor="flexSwitchCheckDefault"
            >
              Private
            </label>
            <input
              className="form-check-input pointer"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={isPublic}
              onChange={() => projectAction({ projectId, isPublic: !isPublic })}
            />
            <label
              className="form-check-label postion-last"
              htmlFor="flexSwitchCheckDefault"
            >
              Public
            </label>

            <Dropdown className="position-static interFont">
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu>
                <Dropdown.Item
                  className="redText"
                  onClick={() => projectAction({ projectId, isDeleted: true })}
                >
                  <FontAwesomeIcon icon="trash" className="me-2" />
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

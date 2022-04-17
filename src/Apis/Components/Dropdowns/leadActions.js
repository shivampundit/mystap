import React, { useState } from "react";
import { Dropdown, Modal, FormCheck, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import { leadActions } from "../../Apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Router/routes";
import moment from "moment";

const snoozeTypes = [
  { label: "1 Week", type: "week", value: 1 },
  { label: "1 Month", type: "month", value: 1 },
  { label: "3 Months", type: "month", value: 3 },
  { label: "Choose a date :", type: "custom" },
];

const LeadActions = ({
  lead,
  onEdit,
  dots = false,
  setSuccess,
  show,
  onToggle,
}) => {
  const navigate = useNavigate();
  const [snoozeModal, setSnoozeModal] = useState(false);
  const [snoozeType, setSnoozeType] = useState(0);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const actionHandler = (type) => {
    const payload = {
      leadId: lead?._id,
    };

    if (type === "snooze") {
      setSnoozeModal(true);
    } else {
      if (type === "delete") {
        payload.isDeleted = true;
      } else if (type === "archive") {
        payload.archive = !lead?.isArchive;
      }
      confirmAlert({
        message: `Are you sure you want to ${
          lead?.isArchive ? "un" : ""
        }${type} lead?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              leadActions(payload).then((res) => {
                toast.success(res?.message);
                if (setSuccess) {
                  setSuccess((s) => !s);
                }
                if (type === "delete" && !dots) {
                  navigate(ROUTES.LEADS, { replace: true });
                }
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

  const snoozeHandler = () => {
    const { value, type } = snoozeTypes[snoozeType];
    leadActions({
      leadId: lead?._id,
      snooze: true,
      snoozeTill:
        snoozeType !== 3
          ? moment().add(value, type).format("MM/DD/yyyy")
          : moment(date).format("MM/DD/yyyy"),
    }).then((res) => {
      setSnoozeModal(false);
      toast.success(res?.message);
      if (setSuccess) {
        setSuccess((s) => !s);
      }
    });
  };

  return (
    <>
      <Dropdown
        onClick={(e) => e.stopPropagation()}
        className="interFont"
        onToggle={() =>
          onToggle?.((prev) => (prev === lead?._id ? null : lead?._id))
        }
        show={show !== undefined ? lead?._id === show : undefined}
      >
        {!!dots ? (
          <Dropdown.Toggle className="dots">
            <FontAwesomeIcon icon="ellipsis-h" size="sm" />
          </Dropdown.Toggle>
        ) : (
          <Dropdown.Toggle className="lead-actions-btn">
            ...Actions
          </Dropdown.Toggle>
        )}

        <Dropdown.Menu>
          {!!onEdit && (
            <Dropdown.Item className="grayText" onClick={onEdit}>
              <FontAwesomeIcon icon="pen" className="me-2" />
              Edit
            </Dropdown.Item>
          )}

          <Dropdown.Item
            className="grayText"
            onClick={() => actionHandler("snooze")}
          >
            <FontAwesomeIcon icon="clock" className="me-2" />
            Snooze
          </Dropdown.Item>
          <Dropdown.Item
            className="grayText"
            onClick={() => actionHandler("archive")}
          >
            <FontAwesomeIcon icon="archive" className="me-2" />
            {lead?.isArchive ? "Unarchive" : "Archive"}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="redText"
            onClick={() => actionHandler("delete")}
          >
            <FontAwesomeIcon icon="trash" className="me-2" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal
        show={snoozeModal}
        className="interFont"
        onHide={() => setSnoozeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Snooze Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          For how long do you want to snooze this lead?
          {snoozeTypes.map((type, i) => (
            <div className="d-flex mt-2" key={i}>
              <FormCheck
                type="checkbox"
                id={`check-${i}`}
                checked={snoozeType === i}
                onChange={(e) => setSnoozeType(i)}
              />
              <label className="ms-2" htmlFor={`check-${i}`}>
                {type.label}
              </label>
            </div>
          ))}
          <FormControl
            type="date"
            className="mt-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={snoozeType !== 3}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-get-started" onClick={snoozeHandler}>
            Snooze
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeadActions;

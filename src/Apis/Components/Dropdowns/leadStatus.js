import React from "react";
import { getDropdownColor } from "../../Helpers/utils";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import { leadActions } from "../../Apis";
import { toast } from "react-toastify";

export const getLeadStatus = (status) => {
  switch (status) {
    case 1:
      return "New";
    case 2:
      return "Follow Up";
    case 3:
      return "Meeting Schedule";
    case 4:
      return "Estimate Sent";
    case 5:
      return "Signed Up";
    default:
      return "Active";
  }
};

export const filters = [
  { type: 1, label: "New", key: "new" },
  { type: 2, label: "Follow Up", key: "followUp" },
  { type: 3, label: "Meeting Schedule", key: "meetingSchedule" },
  { type: 4, label: "Estimate Sent", key: "estimateSent" },
  { type: 5, label: "Signed Up", key: "signedUp" },
];

export const extraFilters = [
  { type: 6, label: "Snooze", key: "snooze" },
  { type: 7, label: "Archive", key: "archive" },
];

const LeadStatus = ({
  status = 0,
  leadId = "",
  setSuccess,
  show,
  onToggle,
}) => {
  const updateLeadStatus = (leadStatus) => {
    confirmAlert({
      message: `Are you sure you want to change the status of lead?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            leadActions({ leadId, leadStatus }).then((res) => {
              toast.success(res?.message);
              setSuccess((s) => !s);
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <DropdownButton
      title={
        <>
          {getLeadStatus(status)}
          <FontAwesomeIcon icon="caret-down" className="ms-2" />
        </>
      }
      size="sm"
      className={`lead-status ${getDropdownColor(status)}`}
      onToggle={() => onToggle?.((prev) => (prev === leadId ? null : leadId))}
      show={show !== undefined ? leadId === show : undefined}
    >
      {filters.map((filter, i) => (
        <Dropdown.Item key={i} onClick={() => updateLeadStatus(filter.type)}>
          <input
            type="radio"
            checked={filter.type === status}
            className="me-2"
          />
          {filter.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default LeadStatus;

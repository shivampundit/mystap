import React, { useEffect, useState } from "react";
import {
  getLeadDetail,
  addEditLeadDetail,
  addEditLead,
} from "../../../../Apis";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Spinner,
  Accordion,
  Dropdown,
} from "react-bootstrap";
import FormInput from "../../../../Components/Forms/FormInput";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditLeadSchema } from "../../../../Constants";
import { confirmAlert } from "react-confirm-alert";
import {
  LEAD_DETAIL_TYPE,
  LEAD_DETAIL_TABS,
} from "../../../../Constants/enums";
import { bytesToSize } from "../../../../Helpers/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeadStatus from "../../../../Components/Dropdowns/leadStatus";
import LeadActions from "../../../../Components/Dropdowns/leadActions";
import NotesTab from "./notesTab";

const fields = [
  {
    name: "name",
    type: "text",
    placeholder: "Client Name",
    label: "Client Name",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email Address",
    label: "Email Address",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Phone Number",
    label: "Phone Number",
  },
  {
    name: "buildingName",
    type: "text",
    placeholder: "Building Name",
    label: "Building Name",
  },
  [
    {
      name: "address",
      type: "text",
      placeholder: "Street Address",
      label: "Street Address",
    },
    {
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
    },
  ],
  [
    {
      name: "state",
      type: "text",
      placeholder: "State",
      label: "State",
    },
    {
      name: "pinCode",
      type: "text",
      placeholder: "Pin Code",
      label: "Pin Code",
    },
  ],
];
const LeadDetail = () => {
  const { id: leadId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(LEAD_DETAIL_TYPE.NOTES);
  const [leadData, setLeadData] = useState();
  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);

  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(addEditLeadSchema),
  });

  useEffect(() => {
    setLoading(true);
    getLeadDetail({
      leadId,
      type,
    })
      .then((res) => {
        setLeadData(res?.data?.leadData);
        reset(res?.data?.leadData);
        if (type === LEAD_DETAIL_TYPE.NOTES) {
          setNotes(res?.data?.data);
        } else {
          setFiles(res?.data?.data);
        }
      })
      .finally(() => setLoading(false));
  }, [leadId, type, success, reset]);

  const addNewFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      confirmAlert({
        message: `Are you sure you want to upload ${file.name} file?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              const payload = new FormData();
              payload.append("leadId", leadId);
              payload.append("file", file);
              payload.append("type", type);
              addEditLeadDetail(payload)
                .then((res) => toast.success("File Upload Successfully"))
                .finally(() => setSuccess((s) => !s));
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  const updateClientDetails = (data) => {
    const payload = {
      leadId: data?._id,
      name: data?.name,
      email: data?.email,
      city: data?.city,
      state: data?.state,
      address: data?.address,
      buildingName: data?.buildingName,
      phoneNumber: `${data?.phoneNumber}`,
      pinCode: `${data?.pinCode}`,
    };

    addEditLead(payload).then((res) => {
      toast.success("Lead Saved Successfully!");
      setSuccess((s) => !s);
    });
  };

  return (
    <>
      <section className="main-section manegement-leads">
        {loading ? (
          <Row>
            <Col className="text-center">
              <Spinner animation="border" variant="success" />
            </Col>
          </Row>
        ) : (
          <Container fluid>
            <Row>
              <Col md="12" className="text-start">
                <div className="mange-heading d-flex justify-content-between align-items-center">
                  <h3>
                    <span className="pointer" onClick={() => navigate(-1)}>
                      {`Lead / `}
                    </span>
                    <span>{leadData?.name}</span>
                  </h3>
                  <div className="action-btn d-flex align-items-center">
                    <LeadActions lead={leadData} />
                    {/* <button className="know-more">Mark As Won</button> */}
                  </div>
                </div>
                <hr />
              </Col>
              <Col md="8" className="text-start">
                <div className="lead-magement">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {LEAD_DETAIL_TABS.map((tab, i) => (
                      <li className="nav-item" key={i}>
                        <button
                          className={`nav-link ${
                            type === i + 1 ? "active" : ""
                          }`}
                          onClick={() => setType(i + 1)}
                        >
                          {tab}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade">...</div>
                    <NotesTab
                      leadId={leadId}
                      notes={notes}
                      setNotes={setNotes}
                      setSuccess={setSuccess}
                      active={type === LEAD_DETAIL_TYPE.NOTES}
                    />

                    <div
                      className={`tab-pane fade ${
                        type === LEAD_DETAIL_TYPE.FILES ? "show active" : ""
                      }`}
                    >
                      <div className="file-shared">
                        <div className="file-share-header">
                          <h3>{`All Files ${files.length}`}</h3>
                          <label className="addNewFile" htmlFor="fileInput">
                            Add File
                          </label>
                          <input
                            type="file"
                            hidden
                            id="fileInput"
                            onChange={addNewFile}
                          />
                        </div>
                        {files.length ? (
                          <div className="file-shared-body">
                            {files.map((file, i) => (
                              <div className="file-full btn-reveal" key={i}>
                                <div className="file-one d-flex">
                                  <i className="fas fa-file me-3"></i>
                                  <div className="floorplan">
                                    <h6>{file?.fileUrl?.fileName || ""}</h6>
                                    <p className="mb-0">
                                      {moment(file.updatedAt).format(
                                        "MMM DD, YYYY hh:mm A"
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="file-two">
                                  <div className="floorplan">
                                    <p className="mb-0">
                                      {bytesToSize(file?.fileUrl?.size)}
                                    </p>
                                  </div>
                                </div>

                                <Dropdown>
                                  <Dropdown.Toggle className="dots">
                                    <FontAwesomeIcon
                                      icon="ellipsis-h"
                                      size="sm"
                                    />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item className="redText interFont">
                                      <FontAwesomeIcon
                                        icon="trash"
                                        className="me-2"
                                      />
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Row>
                            <Col className="text-center interFont">
                              No files found.
                            </Col>
                          </Row>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md="4" className="mt-3">
                <div className="right-mangement interFont">
                  <Accordion className="mb-3">
                    <form onSubmit={handleSubmit(updateClientDetails)}>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Client Details</Accordion.Header>
                        <Accordion.Body>
                          {fields.map((field, i) =>
                            Array.isArray(field) ? (
                              <Row key={i}>
                                {field.map((f, index) => (
                                  <Col key={index}>
                                    <FormInput
                                      {...f}
                                      register={register(f.name)}
                                      isInvalid={!!errors?.[f.name]}
                                      error={errors?.[f.name]?.message}
                                    />
                                  </Col>
                                ))}
                              </Row>
                            ) : (
                              <FormInput
                                key={i}
                                {...field}
                                register={register(field.name)}
                                isInvalid={!!errors?.[field.name]}
                                error={errors?.[field.name]?.message}
                              />
                            )
                          )}
                          <button type="submit" className="know-more">
                            Save
                          </button>
                        </Accordion.Body>
                      </Accordion.Item>
                    </form>
                  </Accordion>

                  <div className="lead-stage d-flex">
                    <h3>Lead Stage</h3>
                    <LeadStatus
                      status={leadData?.leadStatus}
                      leadId={leadData?._id}
                      setSuccess={setSuccess}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
    </>
  );
};

export default LeadDetail;

import React, { useEffect } from "react";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import FormInput from "../../../Components/Forms/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEditLeadSchema } from "../../../Constants";
import { addEditLead } from "../../../Apis";
import { toast } from "react-toastify";

const fields = [
  {
    name: "name",
    type: "text",
    placeholder: "Client Name",
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email Address",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Phone Number",
  },
  {
    name: "buildingName",
    type: "text",
    placeholder: "Building Name",
  },
  [
    {
      name: "address",
      type: "text",
      placeholder: "Street Address",
    },
    {
      name: "city",
      type: "text",
      placeholder: "City",
    },
  ],
  [
    {
      name: "state",
      type: "text",
      placeholder: "State",
    },
    {
      name: "pinCode",
      type: "text",
      placeholder: "Pin Code",
    },
  ],
];

const defaultValues = {
  name: "",
  email: "",
  city: "",
  state: "",
  address: "",
  buildingName: "",
  phoneNumber: "",
  pinCode: "",
};

const AddEditLead = ({ show, setModal, setSuccess, isEdit, editData }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addEditLeadSchema),
  });

  useEffect(() => {
    if (isEdit) {
      reset(editData);
    } else {
      reset(defaultValues);
    }
  }, [editData, isEdit, reset, show]);

  //Add Edit Lead Api
  const submitHandler = (data) => {
    const payload = {
      name: data?.name,
      email: data?.email,
      city: data?.city,
      state: data?.state,
      address: data?.address,
      buildingName: data?.buildingName,
      phoneNumber: `${data?.phoneNumber}`,
      pinCode: `${data?.pinCode}`,
    };
    if (isEdit) {
      payload.leadId = data?._id;
    }
    addEditLead(payload).then((res) => {
      toast.success("Lead Saved Successfully!");
      setModal(false);
      setSuccess((s) => !s);
    });
  };

  return (
    <Modal show={show} onHide={() => setModal(false)} centered>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Modal.Header closeButton>
          <Modal.Title className="interFont">Create New Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fields.map((field, i) =>
            Array.isArray(field) ? (
              <Row key={i} >
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
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-get-started" type="submit">
            {isEdit ? "Save Changes" : "Create Lead"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEditLead;

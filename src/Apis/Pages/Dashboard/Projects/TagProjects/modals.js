import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import FormInput from "../../../../Components/Forms/FormInput";

export const ProjectModal = ({ onClose, onSingleClick, onMultiClick }) => {
  return (
    <div className="tagProjectModal">
      <h3>Are all these images from multiple projects?</h3>
      <Row className="mt-4">
        <Col>
          <Button
            size="md"
            className="tagProjectModalBtn"
            onClick={onMultiClick}
          >
            Yes, Multiple Projects
          </Button>

          <Button
            variant="outline-primary"
            className="ms-3 tagProjectModalBtn2"
            size="md"
            onClick={onSingleClick}
          >
            No, Single Project
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export const MultiProjectModal = ({ onSubmit }) => {
  return (
    <div className="tagProjectModal">
      <h3>How many Projects have you uploaded?</h3>
      <form onSubmit={onSubmit}>
        <Row className="mt-4">
          <Col md="4">
            <FormInput type="number" required />
          </Col>
          <Col>
            <Button type="submit" className="tagProjectModalBtn">
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
};

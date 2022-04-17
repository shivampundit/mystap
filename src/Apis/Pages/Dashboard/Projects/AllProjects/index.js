import React, { useEffect, useState } from "react";
import { getProjects} from "../../../../Apis";
import { getProjectImg } from "../../../../Helpers/utils";
import { Row, Col, Container } from "react-bootstrap";
import ProjectCard from "../../../../Components/Cards/projectCard";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getProjects().then((res) => setProjects(res?.data?.data));
  }, [success]);

  return (
    <section className="main-section my-profile">
      <Container fluid>
        <Col md="12">
          <div className="my-projects d-flex align-items-center">
            <h2 className="my-oders">{`My Projects ${
              projects?.length || 0
            }`}</h2>
          </div>
        </Col>
        <Row>
          {projects.length ? (
            projects.map((project, i) => (
              <ProjectCard
                key={i}
                name={project?.name}
                isPublic={project?.isPublic}
                projectId={project?._id}
                address={project?.address}
                img={getProjectImg(project?.data)}
                setSuccess={setSuccess}
              />
            ))
          ) : (
            <div className="col-md-12">
              <div className="projects-card interFont d-flex align-items-center justify-content-center">
                No Projects Found.
              </div>
            </div>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default AllProjects;

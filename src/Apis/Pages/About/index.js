import React from "react";
import about from "../../Assets/about/about.png";
import Testimonial from "../../Components/Common/Testimonial";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <>
      <section className="about-pagess mt-5 pt-5">
        <Container>
          <Row>
            <Col md="6">
              <div className={`${styles.aboutText} pe-5 about-text`}>
                <h2>About IDESIGN MARKET</h2>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className={styles.aboutImg}>
                <img src={about} alt="dummy" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-pagess-tow mt-5 pt-5">
        <Container>
          <Row>
            <Col md="6">
              <div className={styles.aboutImg}>
                <img src={about} alt="dummy" />
              </div>
            </Col>
            <Col md="6">
              <div className={`${styles.aboutText} ms-5`}>
                <h2>Our Mission</h2>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-pagess about-pagess-last mt-5 pt-5 mb-5 pb-5">
        <Container>
          <Row>
            <Col md="6">
              <div className={`${styles.aboutText} pe-6`}>
                <h2>Founder’s Note</h2>
                <p>
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className={styles.aboutImg}>
                <img src={about} alt="dummy" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Testimonial />
    </>
  );
};

export default About;

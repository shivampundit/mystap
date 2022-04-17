import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import { TESTIMONIALS } from "../../../Constants";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <section className={styles.testimonial}>
      <Container>
        <h2>Testimonials</h2>
        <Slider {...settings}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i}>
              <p>{`“${t.feedback}”`}</p>
              <h3>
                {t.name}
                <span>{t.designation}</span>
              </h3>
              <div className={styles.imageContainer}>
                <img alt="alt" src={t.profileImage} />
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Testimonial;

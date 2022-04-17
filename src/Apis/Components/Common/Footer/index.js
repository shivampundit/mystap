import React from "react";
import facebook from "../../../Assets/Logos/Social/Facebook.svg";
import instagram from "../../../Assets/Logos/Social/Instagram.svg";
import whatsapp from "../../../Assets/Logos/Social/WhatsApp.svg";
import youtube from "../../../Assets/Logos/Social/Youtube.svg";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { scrollToTop } from "../../../Helpers/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newsLetterSchema } from "../../../Constants";
import FormInput from "../../Forms/FormInput";
import { submitQuery } from "../../../Apis";
import { toast } from "react-toastify";

const companyLinks = [
  { label: "About", to: ROUTES.ABOUT_US },
  { label: "Careers", to: ROUTES.ABOUT_US },
  { label: "Privacy Policy", to: ROUTES.PRIVACY_POLICY },
  { label: "Terms & Conditions", to: ROUTES.TERMS_AND_CONDITIONS },
  { label: "Cookie policy", to: ROUTES.COOKIE_POLICY },
  { label: "Contact", to: ROUTES.CONTACT },
];

const homeownersLinks = [
  { label: "Find Professionals", to: ROUTES.PROFESSIONAL_B2B },
  { label: "Explore Projects", to: ROUTES.EXPLORE_B2B },
  { label: "Sign In", to: ROUTES.LOGIN },
];

const designLinks = [
  { label: "Join IDesign Pro", to: ROUTES.ID },
  { label: "Pricing", to: ROUTES.PRICING },
  { label: "Magazine", to: ROUTES.MAGAZINES },
  { label: "Sign In", to: ROUTES.LOGIN },
];

const Footertwo = () => {
  const {pathname} = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(newsLetterSchema) });

  const newsLetterSubmit = ({ email }) => {
    submitQuery({ type: 1, data: email }).then((res) =>
      toast.success("Newsletter subscribed")
    );
  };

  return (
    <div className={styles.footer}>
      <Container>
        <Row>
          <Col md="3" className={`text-start fotoer-one ${styles.fullWidth}`}>
            <div className={styles.footerLogo}>
              <h2>IDESIGN MARKET </h2>
              <p>
                iDesign is an online marketplace providing SaaS, Design Tools
                and workflow features, dedicated to Interior Community.
              </p>

              <div className={`d-flex mt-4 mb-4 ${styles.socialIcon}`}>
                <a
                  href="https://fb.com/iDesign.market"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="fb" className="pointer" />
                </a>
                <a
                  href="https://www.instagram.com/iDesign.market/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <img src={instagram} alt="ig" className="pointer" />
                </a>
                <a
                  href="https://wa.me/+919289347893?text=I'm%20interested%20in%20your%20Services"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={whatsapp} alt="wa" className="pointer" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCZYsSoot4r9eZSPJk6F7-xw"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  <img src={youtube} alt="yt" className="pointer" />
                </a>
              </div>
              <p>Corporate Social Responsibility</p>
            </div>
          </Col>
          <Col md="2" className={`text-start ${styles.fullWidth}`}>
            <ul className={styles.menuFooter}>
              <h4>Company</h4>
              {companyLinks.map((link, i) => (
                <Link to={link.to} key={i} onClick={scrollToTop}>
                  <li>{link.label}</li>
                </Link>
              ))}
            </ul>
          </Col>

          <Col md="2" className={`text-start ${styles.fullWidth}`}>
            <ul className={styles.menuFooter}>
              <h4>Homeowners</h4>
              {homeownersLinks.map((link, i) => (
                <a href={link.to} target="_blank" rel="noreferrer" key={i}>
                  <li>{link.label}</li>
                </a>
              ))}
            </ul>
          </Col>

          <Col md="2" className={`text-start ${styles.fullWidth}`}>
            <ul className={styles.menuFooter}>
              <h4>Design Professionals</h4>

              {designLinks.map((link, i) => (
                <Link to={link.to} key={i} onClick={scrollToTop}>
                  <li>{link.label}</li>
                </Link>
              ))}
            </ul>
          </Col>
          <Col md="3" className={`text-start ${styles.fullWidth}`}>
            <ul className={styles.menuFooter}>
              <h4>Sign up to our newsletter</h4>

              <div className={styles.emailBtn}>
                <form onSubmit={handleSubmit(newsLetterSubmit)}>
                  <FormInput
                    type="text"
                    placeholder="Email"
                    register={register("email")}
                    isInvalid={!!errors?.email}
                    error={errors?.email?.message}
                  />
                  <button className="know-more" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </ul>
          </Col>

          <Col md="12" className="pt-4 pb-4 text-center interFont">
            <div className={styles.footerBottom}>
              <h4>
                {new Date().getFullYear().toString()} IDESIGN MARKET is a
                copyright product of Marks Dzyn Private Limited. All Rights
                Reserved
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
      {pathname !== ROUTES.PROFILE_BUILD && (
        <Link to={ROUTES.LOGIN} onClick={scrollToTop}>
          <button className="know-more join-as-pro">Join as a Pro</button>
        </Link>
      )}
    </div>
  );
};

export default Footertwo;

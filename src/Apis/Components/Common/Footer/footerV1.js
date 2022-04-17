import React from "react";
import facebook from "../../../Assets/Logos/Social/Facebook.svg";
import instagram from "../../../Assets/Logos/Social/Instagram.svg";
import whatsapp from "../../../Assets/Logos/Social/WhatsApp.svg";
import youtube from "../../../Assets/Logos/Social/Youtube.svg";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { scrollToTop } from "../../../Helpers/utils";

const links = [
  { label: "Company", to: ROUTES.ABOUT_US },
  { label: "About", to: ROUTES.ABOUT_US },
  { label: "Careers", to: ROUTES.ABOUT_US },
  { label: "Privacy and Notice", to: ROUTES.PRIVACY_POLICY },
  { label: "Terms", to: ROUTES.ABOUT_US },
  { label: "Cookie policy", to: ROUTES.ABOUT_US },
  { label: "Contact", to: ROUTES.CONTACT },
];

const navigationLinks = [
  { label: "Design Professionals", to: ROUTES.ABOUT_US },
  { label: "Products", to: ROUTES.PRODUCTS },
  { label: "Pricing", to: ROUTES.PRICING },
  { label: "Brand Offers", to: ROUTES.BRAND },
  { label: "Marketplace", to: ROUTES.ABOUT_US },
];

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <Row>
          <Col md="7" className="text-start">
            <div className={styles.footerLogo}>
              <h2>IDESIGN MARKET </h2>
              <p>
                IDESIGN MARKET by marks dzyn private limited is a Software
                Service and Community <br /> Platform for Design Professionals.
              </p>
              <ul className={styles.menuFooter}>
                {links.map((link, i) => (
                  <Link to={link.to} key={i} onClick={scrollToTop}>
                    <li>{link.label}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </Col>
          <Col md="2" className="text-start">
            <ul className={styles.menuFooter}>
              <h4>Navigation</h4>

              {navigationLinks.map((link, i) => (
                <Link to={link.to} key={i} onClick={scrollToTop}>
                  <li>{link.label}</li>
                </Link>
              ))}
            </ul>
          </Col>
          <Col md="3" className="text-start">
            <ul className={styles.menuFooter}>
              <h4>Contact</h4>
              <li>Connect with us!</li>
              <div className={`d-flex mt-5 mb-5 ${styles.socialIcon}`}>
                <img src={facebook} alt="fb" />
                <img src={instagram} alt="ig" />
                <img src={whatsapp} alt="wa" />
                <img src={youtube} alt="yt" />
              </div>
              <li>
                <span>
                  Corporate Social <br /> Responsibility
                </span>
              </li>
            </ul>
          </Col>
          <Col className="pt-4 pb-4 text-center">
            <div className={styles.footerBottom}>
              <h4>
                {new Date().getFullYear().toString()} IDesign by marks dzyn
                private limited. All rights reserved
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;

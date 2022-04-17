import React from "react";
import check from "../../../Assets/Dashboard/check_circle.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";

const OrderPlaced = () => {
  return (
    <>
      <section className="order-placed main-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="order-text">
                <img src={check} alt="icon" />
                <h4>Your Order has been placed! </h4>
                <p>Confirmation will be sent to your email.</p>
                <Link to={ROUTES.LEADS} replace>
                  <button className="btn know-more">Dashboard</button>
                </Link>
              </div>
            </div>

            {/* <div className="col-md-12 text-center">
              <div className="order-text order-content">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an
                  unknownprinter took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPlaced;

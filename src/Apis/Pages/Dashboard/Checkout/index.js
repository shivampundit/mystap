import React, { useState, useEffect } from "react";
import { Modal, FormCheck } from "react-bootstrap";
import { changePlan, getPlans, createOrder } from "../../../Apis";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Router/routes";
import { PLAN_TERMS_CONDITIONS } from "../../../Constants/strings";
import { useSelector } from "react-redux";
import { RAZOR_PAY_KEY } from "../../../Config";

const Checkout = () => {
  const { id: planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState();
  const [termsModal, setTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const user = useSelector((state) => state.auth);

  // fetch plan using planid
  useEffect(() => {
    getPlans({ planId }).then((res) => setPlan(res?.data));
  }, [planId]);

  // generate new order
  const placeOrderOnRazorpay = async () => {
    const amount = plan?.price * plan?.duration + plan?.tax;
    const res = await createOrder({ amount });

    if (res?.statusCode !== 200) {
      toast.error(res?.message);
      return;
    }

    const option = {
      description: plan?.description,
      currency: "INR",
      key: RAZOR_PAY_KEY,
      amount: res?.data?.amount,
      name: plan?.name,
      order_id: res?.data?.id,
      handler: paymentHandler.bind(this, amount),
      prefill: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: `${user?.email}`,
        contact: `${user?.phoneNumber}`,
      },
      notes: {
        address: `Payment for ${plan?.name}`,
      },
      theme: {
        color: "#61dafb",
      },
    };

    try {
      const paymentObject = new window.Razorpay(option);
      paymentObject.open();
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // handle payment response from razorpay
  const paymentHandler = async (amount, response) => {
    const data = {
      planId,
      pricePaid: amount,
      razorPaymentId: response?.razorpay_payment_id,
      razorOrderId: response?.razorpay_order_id,
      razorSignature: response?.razorpay_signature,
    };
    changePlan(data).then((res) => {
      toast.success("Plan Changed Successfully");
      navigate(ROUTES.ORDER_PLACED, { replace: true });
    });
  };

  const acceptTerms = () => {
    setTermsAccepted(true);
    setIsInvalid(false);
    setTermsModal(false);
  };

  const closeModal = () => {
    setTermsAccepted(false);
    setIsInvalid(true);
    setTermsModal(false);
  };

  const placeOrder = () => {
    if (!termsAccepted) {
      setIsInvalid(true);
    } else {
      placeOrderOnRazorpay();
    }
  };

  const checkTerms = (e) => {
    if (termsAccepted) {
      setTermsAccepted(false);
    } else {
      setTermsModal(true);
    }
  };

  return (
    <>
      <section className="main-section checkout-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start mb-2">
              <div className="lead-plan">
                <h3>CHECK OUT</h3>
                <hr />
              </div>
            </div>
            <div className="col-md-8">
              <div className="checkout-content">
                <h6>Selected Plan Details</h6>
                <hr />
                <div className="checkout-img-text d-flex mt-4">
                  <div className="checkout-img">
                    <img src={plan?.imageUrl?.original || plan} alt="icon" />
                  </div>
                  <div className="checkout-text">
                    <div className="dash-plan ps-5">
                      <h4>{plan?.name}</h4>
                      <h5 className="mt-3 mb-3">
                        {`₹ ${plan?.price}/`}
                        <span>month</span>
                      </h5>
                      <ul className="plan-ul">
                        {(plan?.features || []).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <div className="agree-inut mt-4 interFont">
                        <FormCheck
                          label={
                            <label htmlFor="tnc" 
                            style={{position:"relative",bottom:"0.7em"}}>
                              I agree to the <strong> Terms & Conditions </strong>
                            </label>
                          }
                          checked={termsAccepted}
                          onChange={checkTerms}
                          feedback="You must agree T&C"
                          feedbackType="invalid"
                          isInvalid={isInvalid}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-content">
                <h6>Order Summary</h6>
                <hr />
                <ul className="ul-checkout">
                  <li className="mb-4">Plan Price x Duration</li>
                  <li className="mb-4">
                    ₹{`${plan?.price} x ${plan?.duration}`}
                  </li>

                  <li></li>
                  <li></li>
                  <li>GST</li>
                  <li>₹{plan?.tax}</li>
                  <hr />
                  <li>Total</li>
                  <li>₹{(plan?.price * plan?.duration + plan?.tax).toFixed(2)}</li>
                </ul>
              </div>
              <button
                className="btn know-more place-order-btn"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={termsModal}
        onHide={closeModal}
        className="interFont"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {PLAN_TERMS_CONDITIONS.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <button onClick={acceptTerms} className="know-more ">
            I Agree
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Checkout;

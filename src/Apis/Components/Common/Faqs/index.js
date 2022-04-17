import React from "react";
import Collapsible from "react-collapsible";
import { FAQS } from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Faqs = () => {
  return (
    <section className="faq">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 text-center">
            <div className="faq-content">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-content-text">
                {FAQS.map((faq, i) => (
                  <Collapsible
                    key={i}
                    transitionTime={300}
                    trigger={[
                      faq.question,
                      <FontAwesomeIcon icon={"chevron-down"} />,
                    ]}
                  >
                    <p>{faq.answer}</p>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;

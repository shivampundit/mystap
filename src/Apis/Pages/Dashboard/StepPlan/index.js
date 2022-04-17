import React from "react";
import { FormControl } from "react-bootstrap";
import zoom from "../../../Assets/Dashboard/zoom.svg";
// import fee from "../../../Assets/Dashboard/fee.svg";
// import tickgreen from "../../../Assets/Dashboard/tickgreen.svg";
// import tickblack from "../../../Assets/Dashboard/tickblack.svg";
// import { useNavigate } from "react-router-dom";
// import { FormControl } from "react-bootstrap";
// import { DESIGNER_FEE_STEP } from "../../../Constants/enums";
// import ProgressBar from "../../../Components/ProgressBar";



const StepPlan = () => {
  return (
    <>
      <section className="main-section zoom-profile step-two">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 text-start mb-4">
              <div className="dash-heading">
                  <span>Step 2 of 3</span>
                    <h3>Great! Now let’s Grow your Business</h3>
                    <div className="grate-div">
                    <img src={zoom} alt="pic" />
                        <h2>Would you like to earn money from zoom<br /> consultation?</h2>
                        <p>Please mention your hourly consultation fees.</p>

                        <div className="input-zoomss d-flex justify-content-between">
                            <p className="mb-0">Design Fee</p>
                            <p className="red mb-0">* Fees Required</p>
                        </div>
                        <div className="zoom-input">
                        <span>INR</span>
                        <FormControl
                          type="number"
                          name="number"
                          value="number"
                          className="disableErrorIcon"
                        />
                        <span>/Hour</span>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between btn-pre-next">
                    <button className="know-more btn-previous">Previous</button>
                    <button className="know-more"> Next</button>
                    </div>
              </div>
            </div>

            <div className="col-md-4 mt-5 pt-4">
                <div className="dose-zoom mt-2">
                    <h5>How Does Zoom Consultation work?</h5>
                    <ul>
                        <li>Connect to Homeowners looking for quick advice</li>
                        <li>Mostly advisory service, no drawings to be provided.</li>
                        <li>Meeting scheduled at mutual convenience.</li>
                    </ul>
                </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default StepPlan;

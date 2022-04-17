import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../Apis";
import { completeProfile } from "../../../Redux/Actions/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../Router/routes";

const SERVICES = [
  {
    name: "Painting",
    price: "",
    type: "/sqft",
    priceTypes: ["/sqft", "/sqft"],
    isSelected: false,
  },
  {
    name: "Woodwork",
    price: "",
    type: "/sqft",
    priceTypes: ["/sqft", "/sqft"],
    isSelected: false,
  },
  {
    name: "Flooring",
    price: "",
    type: "/sqft",
    priceTypes: ["/sqft", "/sqft"],
    isSelected: false,
  },
  {
    name: "Upihoistery",
    price: "",
    type: "/sqft",
    priceTypes: ["/sqft", "/sqft"],
    isSelected: false,
  },
  {
    name: "Electrical Work",
    price: "",
    type: "/sqft",
    priceTypes: ["/sqft", "/sqft"],
    isSelected: false,
  },
];

const ContractorDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [values, setValues] = useState(SERVICES);

  const onValueChange = (e, index) => {
    const prevValues = cloneDeep(values);
    prevValues[index][e.target.name] = e.target.value;
    setValues(prevValues);
  };

  const onCheckChange = (e, index) => {
    const prevValues = cloneDeep(values);
    prevValues[index][e.target.name] = e.target.checked;
    setValues(prevValues);
  };

  const onSubmit = () => {
    const empty = values.every((v) => v.price === "");
    if (empty) {
      toast.error("Please add atleast one price");
    } else {
      const selected = values.filter((v) => v.isSelected && v.price);
      const contractorFees = selected.map((v) => ({
        key: v.name,
        price: v.price,
        priceType: v.type,
      }));
      const data = new FormData();
      data.append("contractorFees", JSON.stringify(contractorFees));
      updateUserProfile(data).then((res) => {
        dispatch(completeProfile(res?.data));
        navigate(ROUTES.DISCOUNT_DOCUMENT);
      });
    }
  };

  return (
    <>
      <section className="main-section services-offered">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="upload-main">
                <h2>Services Offered </h2>
                <h6>Please add the featured services you provide</h6>
                <p className="mb-4">
                  Please help us build your price card. Documenting featured
                  services will help you get more leads!
                </p>

                {values.map((service, i) => (
                  <div
                    className="main-services d-flex justify-content-between mt-4"
                    key={i}
                  >
                    <div className="input-one">
                      <input
                        type="checkbox"
                        name="isSelected"
                        checked={service.isSelected}
                        onChange={(e) => onCheckChange(e, i)}
                      />
                    </div>
                    <div className="input-one input-text">
                      <input type="text" placeholder={service.name} disabled />
                    </div>
                    <div className="input-one">
                      <input
                        type="number"
                        placeholder="Rate(INR)"
                        min={1}
                        name={"price"}
                        value={values?.[i]?.price}
                        onChange={(e) => onValueChange(e, i)}
                      />
                    </div>
                    <div className="input-one">
                      <select
                        id="cars"
                        name="type"
                        onChange={(e) => onValueChange(e, i)}
                      >
                        {service?.priceTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                <button className="know-more mt-4" onClick={onSubmit}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContractorDashboard;

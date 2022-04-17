import React from "react";
import {
  FormGroup,
  FormControl,
  FormSelect,
  FormCheck,
  FormLabel,
} from "react-bootstrap";

const FormInput = ({
  as,
  label,
  type,
  name,
  placeholder,
  isInvalid,
  error,
  register,
  options = [],
  className = "",
  formControlClass,
  ...rest
}) => {
  const renderField = () => {
    if (type === "select") {
      return (
        <FormSelect
          {...{ isInvalid, name }}
          {...register}
          className="invalidFeedback"
        >
          {options.map((op, i) => (
            <option key={i} value={op.value}>
              {op.label}
            </option>
          ))}
        </FormSelect>
      );
    } else if (type === "checkbox") {
      return (
        <FormCheck
          type="checkbox"
          label={placeholder}
          {...{ isInvalid, name }}
          {...register}
        />
      );
    } else {
      return (
        <FormControl
          {...{ type, as, placeholder, isInvalid, name, ...rest }}
          {...register}
          className={formControlClass}
        />
      );
    }
  };

  return (
    <FormGroup className={`form-group ${className}`}>
      {!!label && <FormLabel>{label}</FormLabel>}
      {renderField()}
      {!!error && (
        <FormControl.Feedback type="invalid" className="invalidFeedback">
          {error}
        </FormControl.Feedback>
      )}
    </FormGroup>
  );
};

export default FormInput;

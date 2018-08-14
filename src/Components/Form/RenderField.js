import React from "react";
import { ErrorWrapper } from "./styles";
export default ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div className="form-group">
      <input
        {...input}
        className="form-control"
        placeholder={label}
        type={type}
      />
      {touched && (error && <ErrorWrapper>{error}</ErrorWrapper>)}
    </div>
  </div>
);

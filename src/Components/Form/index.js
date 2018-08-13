import React from "react";
import { reduxForm, Field } from "redux-form";
import { ErrorWrapper } from "./styles";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
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

const Form = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="h2" style={{ textAlign: "center" }}>
        Login
      </h2>
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 4) {
    errors.password = "Must be 4 characters or more";
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "loginForm"
})(Form);

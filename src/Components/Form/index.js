import React from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { ServerAnswer } from "./styles"
import RenderField from "./RenderField"

//Msg from server side setup
const renderServerMsg = msg => {
  if (msg === "done") {
    return <ServerAnswer color={"green"}>You Logged Succesffuly</ServerAnswer>
  } else if (msg === "error") {
    return <ServerAnswer color={"red"}>Something Went Wrong!</ServerAnswer>
  } else {
    return <ServerAnswer color={"red"}>{msg}</ServerAnswer>
  }
}

//Validate for Form
const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 4) {
    errors.password = "Must be 4 characters or more"
  }

  return errors
}

//main
const Form = ({ handleSubmit, serverMsg }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="h2" style={{ textAlign: "center" }}>
        Login
      </h2>
      <Field name="email" type="email" component={RenderField} label="Email" />
      <Field
        name="password"
        type="password"
        component={RenderField}
        label="Password"
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {serverMsg && renderServerMsg(serverMsg)}
    </form>
  )
}

const mapStateToProps = ({ serverMsg }) => {
  return { serverMsg }
}

export default connect(mapStateToProps)(
  reduxForm({
    validate,
    form: "loginForm",
    destroyOnUnmount: true
  })(Form)
)

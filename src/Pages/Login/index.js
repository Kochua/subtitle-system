import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Wrapper, FormWrapper } from "./styles";
import { Form } from "../../Components";
import * as actions from "../../actions";

class Login extends Component {
  render() {
    const { submitLogin_a, history } = this.props;

    return (
      <Wrapper>
        <FormWrapper>
          <Form
            onSubmit={values => {
              submitLogin_a(values, history);
            }}
          />
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default connect(
  null,
  actions
)(withRouter(Login));

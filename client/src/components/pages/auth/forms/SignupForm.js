import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import isEmail from "validator/lib/isEmail";

import SignupField from "./Field";
import { signup } from "../../../../actions/auth";

const validate = values => {
  const errors = {};

  const { email, password, passwordConfirmation } = values;

  if (!email) {
    errors.email = "E-mail is required";
  } else if (!isEmail(email)) {
    errors.email = "Invalid e-mail address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password should have at least 8 characters";
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = "Confirmation is required";
  } else if (passwordConfirmation !== password) {
    errors.passwordConfirmation = "Passwords don't match";
  }

  return errors;
};

class SignupForm extends React.Component {
  formSubmit = data => this.props.signup(data);

  renderFlashMessage = message => (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  render() {
    const { handleSubmit, invalid, flashMessage } = this.props;

    return (
      <div className="col-12">
        {flashMessage && this.renderFlashMessage(flashMessage)}

        <form onSubmit={handleSubmit(this.formSubmit)}>
          <SignupField
            label="Name"
            name="name"
            type="text"
            placeholder="Jhon Doe"
          />

          <SignupField
            label="E-mail"
            name="email"
            type="email"
            placeholder="yourfancyemail@provider.com"
          />

          <SignupField label="Password" name="password" type="password" />

          <SignupField
            label="Password Confirmation"
            name="passwordConfirmation"
            type="password"
          />

          <div className="form-group row">
            <div className="col-md">
              Already have an account? <Link to="/auth/login">Log in</Link>
            </div>
            <div className="col-md text-right">
              <button disabled={invalid} className="btn btn-secondary">
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ flashMessage }) {
  return { flashMessage };
}

SignupForm.propTypes = {
  flashMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired
};

export default reduxForm({
  form: "login",
  validate
})(connect(mapStateToProps, { signup })(SignupForm));

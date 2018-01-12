import React from "react";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import isEmail from "validator/lib/isEmail";

import SignupField from "./Field";

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

const SignupForm = () => (
  <form className="col-12">
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
        Already have an account? <Link to="/login">Log in</Link>
      </div>
      <div className="col-md text-right">
        <button className="btn btn-secondary">Sign up</button>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: "login",
  validate
})(SignupForm);

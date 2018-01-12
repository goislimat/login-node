import React from "react";
import { reduxForm } from "redux-form";

import SignupField from "./Field";

const SignupForm = () => (
  <form>
    <SignupField
      label="E-mail"
      component="input"
      name="email"
      type="email"
      placeholder="yourfancyemail@provider.com"
    />

    <SignupField
      label="Password"
      component="input"
      name="password"
      type="password"
    />

    <SignupField
      label="Password Confirmation"
      component="input"
      name="password_confirmation"
      type="password"
    />

    <div className="form-group row">
      <div className="col-md text-right">
        <button className="btn btn-secondary">Sign up</button>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: "login"
})(SignupForm);

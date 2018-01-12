import React from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import LoginField from "./Field";

const LoginForm = () => (
  <form>
    <LoginField
      label="E-mail"
      component="input"
      name="email"
      type="email"
      placeholder="yourfancyemail@provider.com"
    />

    <LoginField
      label="Password"
      component="input"
      name="password"
      type="password"
    />

    <div className="form-group row">
      <div className="col-md">
        Not a user yet? <Link to="/signin">Sign in</Link>
      </div>
      <div className="col-md text-right">
        <button className="btn btn-secondary">Login</button>
      </div>
    </div>
  </form>
);

export default reduxForm({
  form: "login"
})(LoginForm);

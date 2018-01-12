import React from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import LoginField from "./Field";

const LoginForm = () => (
  <form className="col-12">
    <LoginField
      label="E-mail"
      name="email"
      type="email"
      placeholder="yourfancyemail@provider.com"
    />

    <LoginField label="Password" name="password" type="password" />

    <div className="form-group row">
      <div className="col-md">
        Not a user yet? <Link to="/signup">Sign up</Link>
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

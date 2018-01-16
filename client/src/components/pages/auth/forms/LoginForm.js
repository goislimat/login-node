import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import LoginField from "./Field";
import { login } from "../../../../actions/auth";

const validate = values => {
  const errors = {};

  const { email, password } = values;

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

  return errors;
};

class LoginForm extends React.Component {
  formSubmit = data => this.props.login(data);

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
          <LoginField
            label="E-mail"
            name="email"
            type="email"
            placeholder="yourfancyemail@provider.com"
          />

          <LoginField label="Password" name="password" type="password" />

          <div className="form-group row">
            <div className="col-md">
              Not a user yet? <Link to="/auth/signup">Sign up</Link>
            </div>
            <div className="col-md text-right">
              <button disabled={invalid} className="btn btn-secondary">
                Login
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

LoginForm.propTypes = {
  flashMessage: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

export default reduxForm({
  form: "login",
  validate
})(connect(mapStateToProps, { login })(LoginForm));

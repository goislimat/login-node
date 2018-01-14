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
  state = {
    serverError: {
      present: false,
      status: -1,
      message: ""
    }
  };

  formSubmit = async data => {
    this.setState(prevState => ({
      serverError: {
        ...prevState.serverError,
        present: false
      }
    }));

    try {
      await this.props.login(data);
    } catch (e) {
      const { status } = e.response;
      let err = {};

      if (status === 500) {
        err = {
          present: true,
          status,
          message:
            "The server had an unespected behavior. Contact the support for more info."
        };
      } else {
        err = {
          present: true,
          status,
          message: "E-mail and password combination is not valid!"
        };
      }

      this.setState({ serverError: err });
    }
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    const { serverError: { present, message } } = this.state;

    return (
      <div className="col-12">
        {present && (
          <div className="alert alert-danger text-center" role="alert">
            {message}
          </div>
        )}
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

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

export default reduxForm({
  form: "login",
  validate
})(connect(null, { login })(LoginForm));

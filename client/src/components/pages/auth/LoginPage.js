import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

const OAuthButton = glamorous.a(
  {
    color: "#fff",
    display: "block",
    fontWeight: "bolder",
    marginTop: "20px",
    padding: "15px 0",
    textAlign: "center",
    width: "100%",
    transition: "filter 0.5s",
    ":hover": {
      textDecoration: "none",
      color: "#fff",
      filter: "saturate(70%)"
    }
  },
  ({ backgroundColor }) => ({
    backgroundColor
  })
);

const LoginPage = ({ location: { pathname } }) => (
  <div className="container h100">
    <div className="row d-flex justify-content-center align-items-center h100">
      <div className="col-md-6 row">
        <h2 className="col-12 text-center">Your awesome App</h2>
        {pathname === "/login" ? <LoginForm /> : <SignupForm />}

        <div className="col-md-6">
          <OAuthButton backgroundColor=" #4267b2" href="/auth/facebook">
            Login with Facebook
          </OAuthButton>
        </div>
        <div className="col-md-6">
          <OAuthButton backgroundColor="#f50005" href="/auth/google">
            Login with Google
          </OAuthButton>
        </div>
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default LoginPage;

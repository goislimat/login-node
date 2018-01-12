import React from "react";
import glamorous from "glamorous";

import LoginForm from "./forms/LoginForm";

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

const LoginPage = () => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <LoginForm />

        <div>
          <OAuthButton backgroundColor=" #4267b2" href="/auth/google">
            Login with Facebook
          </OAuthButton>
        </div>
        <div>
          <OAuthButton backgroundColor="#f50005" href="/auth/google">
            Login with Google
          </OAuthButton>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;

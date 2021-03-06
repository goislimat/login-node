import React from "react";

import LoginForm from "./forms/LoginForm";
import OAuthButton from "./components/OAuthButton";

const LoginPage = () => (
  <div className="container h100">
    <div className="row d-flex justify-content-center align-items-center h100">
      <div className="col-md-6 row">
        <h2 className="col-12 text-center">Your awesome App</h2>
        <LoginForm />

        <OAuthButton type="facebook" text="Log in" />
        <OAuthButton type="google" text="Log in" />
      </div>
    </div>
  </div>
);

export default LoginPage;

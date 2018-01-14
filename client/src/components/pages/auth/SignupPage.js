import React from "react";

import SignupForm from "./forms/SignupForm";
import OAuthButton from "./components/OAuthButton";

const Signup = () => (
  <div className="container h100">
    <div className="row d-flex justify-content-center align-items-center h100">
      <div className="col-md-6 row">
        <h2 className="col-12 text-center">Your awesome App</h2>
        <SignupForm />

        <OAuthButton type="facebook" text="Sign Up" />
        <OAuthButton type="google" text="Sign Up" />
      </div>
    </div>
  </div>
);

export default Signup;

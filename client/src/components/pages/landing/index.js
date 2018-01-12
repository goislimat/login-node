import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="container">
    <h1>Design your Landing Page, dude!</h1>
    <div>
      <Link to="/login">Go to Login Page</Link>
    </div>
  </div>
);

export default LandingPage;

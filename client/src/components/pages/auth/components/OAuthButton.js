import React from "react";
import glamorous from "glamorous";

// Defaults to Facebook params
const OAuthLink = glamorous.div(
  "col text-center",
  {
    backgroundColor: "#4267b2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bolder",
    margin: "20px 10px",
    padding: "10px 15px",
    transition: "all .5s",
    ":hover": {
      filter: "saturate(70%)"
    },
    "& i": {
      fontSize: "1.2em"
    },
    "& a, & a:hover": {
      color: "#fff",
      textDecoration: "none"
    }
  },
  ({ backgroundColor, color }) => ({
    backgroundColor,
    color,
    "& a, & a:hover": {
      color
    }
  })
);

const FacebookOAuthButton = text => (
  <OAuthLink>
    <div className="row">
      <div className="col-auto">
        <i className="fa fa-facebook-official" aria-hidden="true" />
      </div>
      <div className="col">
        <a href="/auth/facebook">{text} with Facebook</a>
      </div>
    </div>
  </OAuthLink>
);

const GoogleOAuthButton = text => (
  <OAuthLink backgroundColor="#fff" color="#f50005" className="border">
    <div className="row">
      <div className="col-auto">
        <i className="fa fa-google" aria-hidden="true" />
      </div>
      <div className="col">
        <a href="/auth/google">{text} with Google</a>
      </div>
    </div>
  </OAuthLink>
);

const OAuthButton = ({ text, type }) => {
  switch (type) {
    case "facebook":
      return FacebookOAuthButton(text);
    default:
      return GoogleOAuthButton(text);
  }
};

export default OAuthButton;

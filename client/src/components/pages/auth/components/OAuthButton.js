import React from "react";
import glamorous from "glamorous";

const OAuthLink = glamorous.a(
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

const FacebookOAuthButton = text => (
  <div className="col-md-6">
    <OAuthLink backgroundColor="#4267b2" href="/auth/facebook">
      {text} with Facebook
    </OAuthLink>
  </div>
);

const GoogleOAuthButton = text => (
  <div className="col-md-6">
    <OAuthLink backgroundColor="#f50005" href="/auth/google">
      {text} with Google
    </OAuthLink>
  </div>
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

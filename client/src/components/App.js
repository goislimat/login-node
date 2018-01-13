import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard";
import { fetchUser } from "../actions/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  hasUser = user => Object.keys(user).length !== 0;

  loginStatus = () => {
    const { loaded, user } = this.props.auth;

    if (!loaded) {
      return "Loading...";
    }

    if (!this.hasUser(user)) {
      return "There is no user logged in!";
    }

    return `The user ${user._id} is logged in!!`;
  };

  render() {
    const { auth: { loaded }, location } = this.props;
    return (
      <div className="container-fluid h100">
        {loaded && (
          <div className="h100">
            <div className="text-right">{this.loginStatus()}</div>
            <Route location={location} exact path="/" component={LandingPage} />
            <GuestRoute
              location={location}
              exact
              path="/login"
              component={LoginPage}
            />
            <GuestRoute
              location={location}
              exact
              path="/signup"
              component={LoginPage}
            />
            <UserRoute
              location={location}
              exact
              path="/dashboard"
              component={Dashboard}
            />
          </div>
        )}

        {!loaded && "Loading..."}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

App.propTypes = {
  auth: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string
    })
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { fetchUser })(App);

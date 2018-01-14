import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import GuestRoute from "./routes/GuestRoute";
import UserRoute from "./routes/UserRoute";

import DashboardPage from "./pages/dashboard";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/notFound";
import SignupPage from "./pages/auth/SignupPage";

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
    const { auth: { loaded } } = this.props;
    return (
      <div className="container-fluid h100">
        {loaded && (
          <div className="h100">
            <div className="text-right">{this.loginStatus()}</div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <GuestRoute exact path="/auth/login" component={LoginPage} />
              <GuestRoute exact path="/auth/signup" component={SignupPage} />
              <UserRoute exact path="/dashboard" component={DashboardPage} />
              <Route component={NotFoundPage} />
            </Switch>
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
  fetchUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchUser })(App);

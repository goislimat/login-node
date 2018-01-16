import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.min";

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

  render() {
    const { auth: { loaded } } = this.props;
    return (
      <div className="container-fluid h100">
        {loaded && (
          <div className="h100">
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
    loaded: PropTypes.bool.isRequired
  }).isRequired,
  fetchUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchUser })(App);

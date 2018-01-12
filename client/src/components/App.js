import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./pages/landing";
import LoginPage from "./pages/auth/LoginPage";
import { fetchUser } from "../actions/auth";

const Dashboard = () => <div>You are logged in!</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  hasUser = user => Object.keys(user).length !== 0;

  loginStatus = () => {
    const { auth } = this.props;

    if (!auth.loaded) {
      return "Loading...";
    }

    if (!this.hasUser(auth.user)) {
      return "There is no user logged in!";
    }

    return `The user ${auth.user._id} is logged in!!`;
  };

  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <div className="text-right">{this.loginStatus()}</div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
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

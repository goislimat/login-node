import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import { fetchUser } from "../actions/auth";

const Page = () => (
  <div>
    Design your page, dude! <Link to="/login">Go to login</Link>
  </div>
);

const Dashboard = () => <div>You are logged in!</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  hasUser = user => Object.keys(user).length !== 0;

  loginStatus = () => {
    const { auth } = this.props;

    if (!auth.loaded) {
      return <div>Loading...</div>;
    }

    if (!this.hasUser(auth.user)) {
      return <div>There is no user logged in!</div>;
    }

    return <div>The user {auth.user._id} is logged in!!</div>;
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {this.loginStatus()}
            <Route exact path="/" component={Page} />
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

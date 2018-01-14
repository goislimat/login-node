import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import UserInfo from "./components/UserInfo";

import { logout } from "../../../actions/auth";

const Dashboard = ({ logout: userLogout, user }) => (
  <div className="container">
    <UserInfo user={user} />
    <h2>You&apos;re logged in</h2>
    <div>
      <button className="btn btn-link" onClick={() => userLogout()}>
        Logout
      </button>
    </div>
  </div>
);

function mapStateToProps({ auth: { user } }) {
  return { user };
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { logout })(Dashboard);

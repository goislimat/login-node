import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../../../actions/auth";

const Dashboard = ({ logout: userLogout }) => (
  <div className="container">
    <h2>You&apos;re logged in</h2>
    <div>
      <button className="btn btn-link" onClick={() => userLogout()}>
        Logout
      </button>
    </div>
  </div>
);

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Dashboard);

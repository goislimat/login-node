import React from "react";
import PropTypes from "prop-types";
import { Field as RFField } from "redux-form";

import { css } from "glamor";

const w100 = css({
  width: "100%"
});

const Field = ({ label, ...rest }) => (
  <div className="form-group">
    <label htmlFor="email" className={w100}>
      {label || rest.name}
      <RFField {...rest} className="form-control" />
    </label>
  </div>
);

Field.propTypes = {
  label: PropTypes.string
};

Field.defaultProps = {
  label: ""
};

export default Field;

import React from "react";
import PropTypes from "prop-types";
import { Field as RFField } from "redux-form";
import { Small } from "glamorous";

import { css } from "glamor";

const w100 = css({
  width: "100%"
});

const renderField = field => {
  const { input, label, meta: { touched, error }, ...rest } = field;

  return (
    <div className="form-group">
      <label htmlFor="email" className={w100}>
        {label || rest.name}
        <input {...input} {...rest} className="form-control" />
        {touched && (error && <Small color="red">{error}</Small>)}
      </label>
    </div>
  );
};

const Field = props => <RFField {...props} component={renderField} />;

Field.propTypes = {
  label: PropTypes.string
};

Field.defaultProps = {
  label: ""
};

export default Field;

import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

const UserInfoDiv = glamorous.div(
  "row d-flex justify-content-end align-items-center",
  {
    "& .user": {
      marginRight: "10px"
    },
    "& .image-holder": {
      borderRadius: "20px",
      height: "40px",
      width: "40px"
    }
  },
  props => ({
    "& .image-holder": {
      backgroundImage: `url(${props.image})`,
      backgroundSize: "cover"
    }
  })
);

const UserInfo = ({ user: { name, email, photo } }) => (
  <UserInfoDiv image={photo}>
    <div className="user">{name || email || "Hello, there!"}</div>
    <div className="image-holder" />
  </UserInfoDiv>
);

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    photo: PropTypes.string
  }).isRequired
};

export default UserInfo;
